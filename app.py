from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Replace with your real Power BI dashboard embed URL
POWERBI_DASHBOARD_URL = "https://app.powerbi.com/view?r=eyJrIjoiZDhkNGNiYzgtMjQ0My00OGVlLWJjNzYtZWQwYjI2OThhYWM1IiwidCI6IjllNjgyMzU5LWQxMjgtNGVkYi1iYjU4LTgyYjJhMTUzNDBmZiJ9"

# Simple route for logging (for demo; in production, store in database or a file)
@app.route('/api/log-interaction', methods=['POST'])
def log_interaction():
    data = request.get_json()
    print(f"Interaction logged: {data}")  # For demo, just print to console
    return jsonify({"status": "ok"})

@app.route('/')
def landing():
    # List of video files in /static/videos
    videos = ['video1.mp4', 'video2.mp4', 'video3.mp4']  # Make sure these exist
    return render_template('landing.html', videos=videos)

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html', dashboard_url=POWERBI_DASHBOARD_URL)

if __name__ == '__main__':
    app.run(debug=True)