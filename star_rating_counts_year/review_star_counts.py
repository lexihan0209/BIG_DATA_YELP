from mrjob.job import MRJob
from mrjob.protocol import JSONValueProtocol
from mrjob.step import MRStep
import re

class StarRatingsCount(MRJob):
		INPUT_PROTOCOL = JSONValueProtocol
		def mapper(self, _, data):
			if data['type']=='review':
				stars = data['stars']
				yield (stars,1)


		def combiner(self,star,counts):
			yield(star,sum(counts))

		def reducer(self,star,counts):
			yield(star,sum(counts))	



if __name__ == '__main__':
	StarRatingsCount.run()
				
			
			

