document.addEventListener("DOMContentLoaded", function() {
    fetch('/api/session-status')
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                const loginScreen = document.getElementById('login-screen');
                const studentDash = document.getElementById('student-dashboard');
                const facultyDash = document.getElementById('faculty-dashboard');
                if(loginScreen) loginScreen.classList.add('hidden');
                if (data.role === 'student' && studentDash) {
                    studentDash.classList.remove('hidden');
                } else if (data.role === 'faculty' && facultyDash) {
                    facultyDash.classList.remove('hidden');
                }
            }
        });
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const isFacultyActive = document.getElementById('btn-faculty').classList.contains('active');
            const roleInput = document.getElementById('role-input');
            if (roleInput) {
                roleInput.value = isFacultyActive ? 'faculty' : 'student';
            }
        });
    }
    window.logout = function() {
        fetch('/logout')
            .then(() => {
                window.location.href = "/";
            });
    };
});
