from mrjob.job import MRJob
from mrjob.protocol import JSONValueProtocol
from mrjob.step import MRStep
import re

class StarRatingsCountYear2(MRJob):
		INPUT_PROTOCOL = JSONValueProtocol
		def mapper(self, _, data):
			if data['type']=='review':
				date = data['date']
				stars = data['stars']
				if (stars >= 2.0):
					date=date.split("-")
					year = date[0]
					yield (year, 1)


		def combiner(self,year,counts):
			yield(year,sum(counts))

		def reducer(self,year,counts):
			yield(year,sum(counts))	



if __name__ == '__main__':
	StarRatingsCountYear2.run()