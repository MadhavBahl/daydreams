from flask import Flask, request, json

from app import app

from services.image_search.main import get_image_urls

@app.route('/')
def index():
  return 'Hello from DayDreams!', 200

@app.route('/get-images')
def get_images():
  '''
  Takes a query keyword/string as a parameter and returns a list of images specified by the image_count parameter

  Default count is 5
  '''
  status = 200
  response = {}

  try:
    count = int(request.args.get('count')) if request.args.get('count') else 5
    query = request.args.get('query')

    print(request.args.get('count'))

    if not query or query == '':
      status = 400
      response = {
        'status': 400,
        'message': 'Missing required parameters: query'
      }
    else:
      num_urls, urls = get_image_urls(query)
      if num_urls == 0:
        response = {
          'status': 200,
          'message': 'No images found for query "{}"'.format(query)
        }
      else:
        if num_urls > count:
          urls = urls[:count]
          num_urls = count
        response = {
          'status': 200,
          'message': 'Image search successful!',
          'num_images': num_urls,
          'images': urls
        }
  except Exception as e:
    status = 500
    response = {
      'status': 500,
      'message': 'Internal server error',
      'error': '{}'.format(e)
    }
  return json.dumps(response), status
