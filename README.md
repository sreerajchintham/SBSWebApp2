
# Sequential Backward Selection (SBS) Web Application

This project is a **full-stack web application** that allows users to upload their own dataset, select a target column, choose the desired number of features, and run the **Sequential Backward Selection (SBS)** algorithm to receive a reduced dataset.

It demonstrates both **machine learning** and **modern web development** skills by combining Python (Flask) for the backend and React.js (with Bootstrap) for the frontend.

---

## 🚀 Live Demo

🌐 Frontend: [Your Vercel Link Here]  
🌐 Backend API: [Your Render Link Here]

---

## 📌 Features

✅ Upload any CSV dataset  
✅ Dynamic dropdown to select target column  
✅ Specify the number of features to retain (capped automatically)  
✅ Displays selected features and reduced dataset preview  
✅ Download reduced dataset as CSV  
✅ Fully responsive design with subtle blue theme and animations  

---

## 🛠 Tech Stack

| Frontend          | Backend            |
|-------------------|--------------------|
| React.js          | Python Flask       |
| Bootstrap + CSS   | Scikit-learn, Pandas |
| Axios             | Flask-CORS         |
| Vercel Deployment | Render Deployment  |

---

## 🧩 How It Works

1. **User uploads CSV** → 
2. **User selects target column and number of features (k)** → 
3. **Frontend sends data to Flask backend** → 
4. **SBS algorithm reduces features** → 
5. **Backend returns selected features and reduced dataset** → 
6. **Frontend displays results and allows download**

---

## 📂 Folder Structure


root/
├── backend/
│   ├── app.py
│   ├── sbs.py
│   ├── requirements.txt
│   └── render.yaml
└── frontend/
├── src/
│   ├── App.js
│   ├── App.css
│   └── index.js
└── package.json


---

## 💻 Local Setup Instructions

### 📥 Clone the Repo
```bash
git clone https://github.com/your-username/sbs-webapp.git
cd sbs-webapp
```
---

### 🚀 Backend (Flask API)

1. Navigate to `backend/` folder:

```bash
cd backend
```

2. Create a virtual environment (optional but recommended):

```bash
python -m venv venv
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run the Flask app:

```bash
python app.py
```

✅ Backend will be running on `http://127.0.0.1:5000/`

---

### 🎨 Frontend (React + Bootstrap)

1. Navigate to `frontend/` folder:

```bash
cd ../frontend
```

2. Install frontend dependencies:

```bash
npm install
```

3. Run the React app:

```bash
npm start
```

✅ Frontend will open at `http://localhost:3000`

---

## 🌐 Deployment

* **Frontend:** Deploy the `frontend` folder to [Vercel](https://vercel.com)
* **Backend:** Deploy the `backend` folder to [Render](https://render.com)
* Make sure to update the API URL in `App.js` accordingly.

---

## 📊 Machine Learning Algorithm: SBS

* Implemented using the **Sequential Backward Selection** method from the book *“Python Machine Learning”* by Sebastian Raschka.
* Uses a greedy approach to iteratively remove the least useful features while maximizing model accuracy.
* Fully customizable for any classification task.

---

## 📄 License

This project is licensed under the MIT License. Feel free to use, modify, and share.

---

## 🙌 Acknowledgements

* *Python Machine Learning* by Sebastian Raschka
* scikit-learn, Flask, React, Bootstrap, Render, Vercel

---

> Developed by **Sreeraj Chintham** as part of **Data Mining Course Project**.
