from azure.cognitiveservices.search.imagesearch import ImageSearchAPI
from msrest.authentication import CognitiveServicesCredentials

from app import app

def get_image_urls(query):
  subscription_key = app.config['AZURE_SECRET_KEY']

  client = ImageSearchAPI(CognitiveServicesCredentials(subscription_key))

  image_results = client.images.search(query=query)

  if image_results.value:
    num_urls = len(image_results.value)
    return num_urls, [(value.thumbnail_url, value.content_url) for value in image_results.value]
  else:
    # TODO dude, figure something better than this out you n00b
    return 0, []