from flask import Flask, render_template, request, redirect, url_for, session, jsonify
app = Flask(__name__)
app.secret_key = 'smart_classroom_secure_key'
users = {
    "student@test.com": {"password": "123", "role": "student"},
    "faculty@test.com": {"password": "456", "role": "faculty"}
}
@app.route('/')
def home():
    return render_template('smartclassroom.html')
@app.route('/login', methods=['POST'])
def login():
    email = request.form.get('email')
    password = request.form.get('password')
    role = request.form.get('role') 
    if email in users and users[email]['password'] == password:
        if users[email]['role'] == role:
            session['user'] = email
            session['role'] = role
            return redirect(url_for('home'))
    return redirect(url_for('home'))
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))
@app.route('/api/session-status')
def session_status():
    if 'user' in session:
        return jsonify({"loggedIn": True, "role": session['role']})
    return jsonify({"loggedIn": False})
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
