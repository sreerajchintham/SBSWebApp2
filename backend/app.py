from flask import Flask, request, jsonify
from sbs import SBS
import pandas as pd
from io import StringIO
from sklearn.neighbors import KNeighborsClassifier
from flask_cors import CORS
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
CORS(app)  # To allow frontend requests

@app.route('/')
def home():
    return "SBS Web App Backend is running!"

@app.route('/run-sbs', methods=['POST'])
def run_sbs():
    if 'file' not in request.files:
        return jsonify({'error': 'CSV file missing'}), 400

    file = request.files['file']
    k_features = int(request.form['k_features'])
    target_column = request.form['target_column']

    df = pd.read_csv(file)
    df.dropna(inplace=True)
    
    if target_column not in df.columns:
        return jsonify({'error': 'Target column not found'}), 400
    
    
    encoded_df = df.copy()

    for col in df.columns:
        if df[col].dtype == 'object':
            le = LabelEncoder()
            encoded_df[col] = le.fit_transform(df[col].astype(str))

    y = encoded_df[target_column].values
    X = encoded_df.drop(columns=[target_column]).values
    feature_names = df.drop(columns=[target_column]).columns

    knn = KNeighborsClassifier(n_neighbors=2)
    sbs = SBS(knn, k_features=k_features)
    sbs.fit(X, y)
    selected_features = [feature_names[i] for i in sbs.indices_]

    reduced_df = df[selected_features + [target_column]]

    return jsonify({
        'selected_features': selected_features,
        'reduced_dataset': reduced_df.to_dict(orient='records')
    })

if __name__ == '__main__':
    app.run(debug=True)

