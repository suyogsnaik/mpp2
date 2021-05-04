from flask import Flask
from flask_restful import Resource, Api
from flask_restful import reqparse
from flask_mysqldb import MySQL
from flask_cors import CORS
import boto3

mysql = MySQL()
app = Flask(__name__)



api = Api(app)


# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})
class get_all_records(Resource):
    def post(self):
        try: 
            dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

            table = dynamodb.Table('administrators')
            response = table.scan()
            return response['Items']

        except Exception as e:
            return {'error': str(e)}


             

class new_record(Resource):
    def post(self):

            parser = reqparse.RequestParser()
            parser.add_argument('id', type=str)
            parser.add_argument('name', type=str)
            parser.add_argument('email', type=str)
            args = parser.parse_args()
            print(args['id'],args['name'],args['email'])
            try:
                
                dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

                table = dynamodb.Table('administrators')
                response = table.put_item(
                Item={
                        'id': args['id'],
                        'name': args['name'],
                        'email': args['email']
                    }
                )
                return {'StatusCode':'200','Message': 'success'}
            except Exception as e:
                return {'StatusCode':'1000','Message': str(e)}
class health_record(Resource):
    def get(self):

            return {'StatusCode':'200','Message': 'success'}





api.add_resource(health_record, '/health')


api.add_resource(new_record, '/new')
api.add_resource(get_all_records, '/getall')
if __name__ == '__main__':
        app.run(host='0.0.0.0', port=80,debug=False)
