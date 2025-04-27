function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const error = document.getElementById('error');

    // بيانات الدخول
    const users = {
        "admin": "admin123",
        "mana3": "1234",
        "malek": "1234",
        "ahmed": "1234",
        "omar": "1234"
    };

    if (users[username] && users[username] === password) {
        if (username === "admin") {
            window.location.href = "admin_dashboard.html";
        } else {
            window.location.href = username + "_dashboard.html";
        }
    } else {
        error.textContent = "اسم المستخدم أو كلمة المرور غير صحيحة.";
    }
}

function addOrder() {
    const number = document.getElementById('orderNumber').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const driver = document.getElementById('driver').value;

    if (number && phone && driver) {
        let orders = JSON.parse(localStorage.getItem('orders') || "[]");
        orders.push({ number, phone, driver, status: 'معلق' });
        localStorage.setItem('orders', JSON.stringify(orders));
        alert("تمت إضافة الطلب بنجاح!");
        location.reload();
    } else {
        alert("يرجى تعبئة جميع الحقول");
    }
}

const driverOrdersList = document.getElementById('driverOrdersList');
if (driverOrdersList) {
    const currentPath = window.location.pathname;
    let currentDriver = '';

    if (currentPath.includes('mana3')) currentDriver = 'mana3';
    else if (currentPath.includes('malek')) currentDriver = 'malek';
    else if (currentPath.includes('ahmed')) currentDriver = 'ahmed';
    else if (currentPath.includes('omar')) currentDriver = 'omar';

    let orders = JSON.parse(localStorage.getItem('orders') || "[]");
    let driverOrders = orders.filter(order => order.driver === currentDriver && order.status === 'معلق');

    driverOrdersList.innerHTML = driverOrders.map(order =>
        `<div>
            <b>رقم الطلب:</b> ${order.number}<br>
            <b>الجوال:</b> ${order.phone}<br>
            <a href="https://wa.me/${order.phone}" target="_blank">مراسلة عبر واتساب</a><br><br>
            <button onclick="markAsDeliveredByNumber('${order.number}')">تم التسليم</button>
        </div><hr>`
    ).join('');
}

function markAsDeliveredByNumber(orderNumber) {
    let orders = JSON.parse(localStorage.getItem('orders') || "[]");
    const index = orders.findIndex(order => order.number === orderNumber);
    if (index !== -1) {
        orders[index].status = 'تم التسليم';
        localStorage.setItem('orders', JSON.stringify(orders));
        location.reload();
    }
}

const ordersList = document.getElementById('ordersList');
if (ordersList) {
    let orders = JSON.parse(localStorage.getItem('orders') || "[]");
    ordersList.innerHTML = orders.map(order =>
        `<div>
            <b>رقم الطلب:</b> ${order.number}<br>
            <b>الجوال:</b> ${order.phone}<br>
            <b>المندوب:</b> ${order.driver}<br>
            <b>الحالة:</b> ${order.status}<br>
        </div><hr>`
    ).join('');
}
