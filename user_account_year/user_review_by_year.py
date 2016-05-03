from mrjob.job import MRJob
from mrjob.protocol import JSONValueProtocol
from mrjob.step import MRStep
import re

class UserReviewYearCount(MRJob):
		INPUT_PROTOCOL = JSONValueProtocol
		def mapper(self, _, data):
			if data['type']=='user':
				date = data['yelping_since']
				date=date.split("-")
				year = date[0]
				review = data['review_count']
				yield (year, review)


		def combiner(self,year,counts):
			yield(year,sum(counts))

		def reducer(self,year,counts):
			yield(year,sum(counts))	



if __name__ == '__main__':
	UserReviewYearCount.run()