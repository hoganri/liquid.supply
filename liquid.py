from flask import Flask, render_template, jsonify, json, make_response, request
import pymysql, pymysql.cursors
from datetime import datetime
from flask_sslify import SSLify
import urllib.parse

app = Flask(__name__)
sslify = SSLify(app)

app.secret_key = 'SuperSecretKey'

connection = pymysql.connect(
    host='localhost',
    user='admin',
    password='pass',
    db='liquid_swaps',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)

## 
## Display templates
## 

@app.route('/')
def home():
    return render_template('/index.html')
    
@app.route('/registered-assets')
def registered_assets():
    return render_template('/registered-assets/index.html')

@app.route('/explorer')
def explorer():
    return render_template('/explorer/index.html')

@app.route('/view-proposal')
def view_proposal():
    return render_template('/view-proposal/index.html')

##
## API - supply of data
##

# Swap info
@app.route('/swap-feed')
def swap_feed():
    connection.ping()
    with connection.cursor() as cursor:
        sql = "SELECT * FROM swaps ORDER BY id DESC"
        cursor.execute(sql)
        swap_results = cursor.fetchall()
    return jsonify(swap_results)

@app.route('/proposal-data/<int:proposal_id>')
def proposal_data(proposal_id):
    proposal_id = proposal_id
    connection.ping()
    with connection.cursor() as cursor:
        sql = "SELECT * FROM swaps WHERE id=%s"
        cursor.execute(sql, (proposal_id))
        proposal_results = cursor.fetchall()
    return jsonify(proposal_results)

# Swap acceptance
@app.route('/accept-feed')
def accept_feed():
    connection.ping()
    with connection.cursor() as cursor:
        sql = "SELECT * FROM accepted"
        cursor.execute(sql)
        swap_results = cursor.fetchall()
    return jsonify(swap_results)

@app.route('/accept-data/<int:accept_id>')
def accept_data(accept_id):
    accept_id = accept_id
    connection.ping()
    with connection.cursor() as cursor:
        sql = "SELECT * FROM accepted WHERE swap_id=%s"
        cursor.execute(sql, (accept_id))
        accept_results = cursor.fetchall()
    return jsonify(accept_results)


##
## API - new data
##

@app.route('/new-swap',methods = ['POST', 'GET'])
def new_swap():
    post_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    base_cur = request.args.get('baseCur')
    base_amt = request.args.get('baseAmt')
    count_cur = request.args.get('countCur')
    count_amt = request.args.get('countAmt')
    proposal = request.args.get('proposal')
    pgpKey = request.args.get('pgp')
    pgpKey = urllib.parse.unquote(pgpKey)

    connection.ping()
    with connection.cursor() as cursor:
        sql = "INSERT INTO swaps (post_date, base_cur, base_amt, sec_cur, sec_amt, proposal, pgp_key) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(sql, (post_date, base_cur, base_amt, count_cur, count_amt, proposal, pgpKey))
        connection.commit()
    
    
@app.route('/accept',methods = ['POST', 'GET'])
def accept():
    post_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    swap_id = request.args.get('swap_id')
    accepted = request.args.get('accepted')
    accepted = urllib.parse.unquote(accepted)
    connection.ping()
    with connection.cursor() as cursor:
        sql = "INSERT INTO accepted (post_date, swap_id, acceptance) VALUES (%s, %s, %s)"
        cursor.execute(sql, (post_date, swap_id, accepted))
        connection.commit()

##
## API - remove data
##

@app.route('/remove-swap')
def remove_swap():
    swap_id = request.args.get('swap_id')
    connection.ping()
    with connection.cursor() as cursor:
        sql = "DELETE FROM swaps WHERE id=%s"
        cursor.execute(sql, (swap_id))
        connection.commit()
        
    with connection.cursor() as cursor:
        sql = "DELETE FROM accepted WHERE swap_id=%s"
        cursor.execute(sql, (swap_id))
        connection.commit()