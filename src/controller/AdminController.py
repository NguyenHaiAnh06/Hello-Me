#implement chức năng CRUD của admin
from flask import Flask, request, jsonify

app = Flask(__name__)

# ================== FAKE DATABASE (tạm thời) ==================
products = [
    {"id": 1, "name": "Áo thun nam", "price": 150000, "description": "Áo cotton"},
    {"id": 2, "name": "Quần jean nữ", "price": 300000, "description": "Jean co giãn"}
]

users = []
carts = {}
orders = []

# ================== CLIENT ==================

@app.route('/api/products', methods=['GET'])
def get_products():
    return jsonify(products)

@app.route('/api/products/<int:pid>', methods=['GET'])
def get_product_detail(pid):
    for p in products:
        if p['id'] == pid:
            return jsonify(p)
    return jsonify({'error': 'Product not found'}), 404

@app.route('/api/cart/add', methods=['POST'])
def add_to_cart():
    data = request.json
    user = data['user']
    pid = data['product_id']

    carts.setdefault(user, []).append(pid)
    return jsonify({'message': 'Added to cart'})

@app.route('/api/cart/<user>', methods=['GET'])
def view_cart(user):
    user_cart = carts.get(user, [])
    items = [p for p in products if p['id'] in user_cart]
    return jsonify(items)

@app.route('/api/order', methods=['POST'])
def create_order():
    data = request.json
    orders.append(data)
    return jsonify({'message': 'Order created'})

# ================== AUTH ==================

@app.route('/api/register', methods=['POST'])
def register():
    users.append(request.json)
    return jsonify({'message': 'Register success'})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    for u in users:
        if u['email'] == data['email'] and u['password'] == data['password']:
            return jsonify({'message': 'Login success'})
    return jsonify({'error': 'Invalid credentials'}), 401

# ================== ADMIN ==================

@app.route('/api/admin/products', methods=['POST'])
def admin_add_product():
    products.append(request.json)
    return jsonify({'message': 'Product added'})

@app.route('/api/admin/products/<int:pid>', methods=['DELETE'])
def admin_delete_product(pid):
    global products
    products = [p for p in products if p['id'] != pid]
    return jsonify({'message': 'Product deleted'})

# ================== RUN ==================

if __name__ == '__main__':
    app.run(debug=True)
