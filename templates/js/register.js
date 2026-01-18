document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(registerForm);
            const data = Object.fromEntries(formData.entries());

            if (data.password !== data.confirm_password) {
                return alert('Mật khẩu nhập lại không khớp!');
            }

            try {
                const res = await fetch('http://localhost:3000/api/users/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await res.json();
                alert(result.message);
                if (res.ok) window.location.hash = '#login';
            } catch (err) {
                alert('Lỗi kết nối server cổng 3000!');
            }
        });
    }
});