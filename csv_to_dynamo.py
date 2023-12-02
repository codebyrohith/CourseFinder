import os
import boto3
import csv
import json
from concurrent.futures import ThreadPoolExecutor

def lambda_handler(event, context):
    aws_region = 'us-east-1'
    record_list = []
    try:
        s3 = boto3.client('s3')
        dynamodb = boto3.client('dynamodb', region_name = aws_region) 
        bucket_name = event['Records'][0]['s3']['bucket']['name']
        key = event['Records'][0]['s3']['object']['key']
        print('Bucket', bucket_name, "Key",key)
        csv_file = s3.get_object(Bucket = bucket_name, Key= key)
        
        record_list = csv_file['Body'].read().decode('utf-8').split('\n')
        csv_reader = csv.reader(record_list, delimiter =',', quotechar="'")
        next(csv_reader, None)
        for row in csv_reader:
            item = {
                    "id" : {'S' : row[0]},
                    "title" : {'S' : row[1]},
                    "is_paid" : {'S' : row[2]},
                    "price" : {'N' : row[3]},
                    "num_subs" : {'N' : row[4]},
                    "avg_rating" : {'N' : row[5]},
                    "num_reviews" : {'N' : row[6]},
                    "num_comments" : {'N' : row[7]},
                    "num_lec" : {'N' : row[8]},
                    "content_len" : {'N' : row[9]},
                    "published_time" : {'S' : row[10]},
                    "last_updated" : {'S' : row[11]},
                    "category" : {'S' : row[12]},
                    "subcategory" : {'S' : row[13]},
                    "topic" : {'S' : row[14]},
                    "language" : {'S' : row[15]},
                    "course_url" : {'S' : row[16]},
                    "instructor" : {'S' : row[17]},
                    "instructor_url" : {'S' : row[18]}
                
            }
            add_to_db = dynamodb.put_item(
                TableName = "course_info",
                Item = item)
            print("Successfully added the record", row[0])     
    except Exception as e:
        print(f"An error occurred: {e}")

    return {
        'statusCode': 200,
        'body': 'Data added to DynamoDB successfully!'
    }