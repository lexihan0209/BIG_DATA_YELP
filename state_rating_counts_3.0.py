from mrjob.job import MRJob
from mrjob.protocol import JSONValueProtocol
from mrjob.step import MRStep
import re

class StateRatingsCount(MRJob):
		INPUT_PROTOCOL = JSONValueProtocol
		def mapper(self, _, data):
			if data['type']=='business':
				state = data['state']
				stars = data['stars']
				if stars >= 3.0:
					yield (state,1)


		def combiner(self,state,counts):
			yield(state,sum(counts))

		def reducer(self,state,counts):
			yield(state,sum(counts))	



if __name__ == '__main__':
	StateRatingsCount.run()
				
			
			

