from flask import Flask, request, jsonify
from Chunks import get_chunks
from Engine import load_engine,get_query,get_summary

app = Flask(__name__)
eng=None
stored_data = None

# @app.route('/get_data', methods=['GET'])
# def get_data():
#     data = {'message': 'This is a GET request from the Chrome extension.', 'stored_data': stored_data}
#     return jsonify(data)


@app.route('/post_data', methods=['POST','GET'])
def post_data():
    global eng
    global stored_data #make sure we're referring to global stored_data and not creating a new one locally

    if request.method == 'POST':
        received_data = request.get_json()
        stored_data = received_data['input_data']
        print(stored_data)
        # Return a JSON response when POST method is used
        return jsonify({'message': 'Data posted and stored successfully.', 'stored_data': stored_data})
    else:    
        # Only try to process the data if there is data stored
        if stored_data is not None:
            print("model")
            ans,ts = get_query(eng,stored_data)
            ans = str(ans)
            msg = {'text': ans, 'time': ts}
            print(msg)
            # return a response
            return jsonify(msg)
        else:
            # if there is no stored data, return a meaningful error message
            return jsonify({"error": "No data was posted yet."}), 400


@app.route('/video_data', methods=['POST','GET'])
def video_id():
    global eng
    if request.method == 'POST':
        url = request.get_json()
        if 'youtubeUrl' in url:
            ans = url['youtubeUrl']
            video_id = ans.split('=')[1]
            print(video_id)
            chunks = get_chunks(video_id)
            eng = load_engine(chunks)
            summary = get_summary(eng)
            s = ""
            for S in summary:
                s += S + " "
                print(s)
            st = {'gist': s}
            return jsonify(st), 200
        else:
            return jsonify({'error': 'youtubeUrl not in request'}), 400
    else:
        return jsonify({'message': 'GET request received'}), 200

if __name__ == '__main__':
    app.debug = True
    app.run(host='localhost', port=5000)