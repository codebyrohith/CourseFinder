import boto3
from botocore.exceptions import ClientError
import json

aws_region = 'us-east-1'
dynamodb_table = 'course_info'
column_name = 'category'  

dynamodb = boto3.resource('dynamodb', region_name=aws_region)
table = dynamodb.Table(dynamodb_table)

def lambda_handler(event, context):
    try:
        response = table.scan(ProjectionExpression=column_name)
        items = response.get('Items', [])
        unique_values = set(item.get(column_name) for item in items)

        return {
            'statusCode': 200,
            'body': json.dumps(list(unique_values))
        }

    except ClientError as e:
        # Handle DynamoDB errors
        return {
            'statusCode': 500,
            'body': f"Error retrieving data from DynamoDB: {str(e)}"
        }

    except Exception as e:
        # Handle other unexpected errors
        return {
            'statusCode': 500,
            'body': f"An unexpected error occurred: {str(e)}"
        }