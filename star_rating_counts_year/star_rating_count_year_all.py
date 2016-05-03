from mrjob.job import MRJob
from mrjob.protocol import JSONValueProtocol
from mrjob.step import MRStep
import re

class StarRatingsCountYearAll(MRJob):
		INPUT_PROTOCOL = JSONValueProtocol
		def mapper(self, _, data):
			if data['type']=='review':
				date = data['date']
				date=date.split("-")
				year = date[0]
				yield (year, 1)


		def combiner(self,year,counts):
			yield(year,sum(counts))

		def reducer(self,year,counts):
			yield(year,sum(counts))	



if __name__ == '__main__':
	StarRatingsCountYearAll.run()