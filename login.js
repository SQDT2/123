function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 从 localStorage 获取用户信息
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username] && users[username] === password) {
        localStorage.setItem('currentUser', username);
        // 清除可能存在的切换标记
        window.location.href = 'index.html';
    } else {
        alert('用户名或密码错误！');
    }
}

function showRegister() {
    document.getElementById('registerForm').classList.remove('hidden');
}

function register() {
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('两次输入的密码不一致！');
        return;
    }

    // 从 localStorage 获取现有用户
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username]) {
        alert('用户名已存在！');
        return;
    }

    // 保存新用户
    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));
    alert('注册成功！请登录');
    
    // 清空注册表单
    document.getElementById('newUsername').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    document.getElementById('registerForm').classList.add('hidden');
}

// 修改初始化默认用户函数
function initDefaultUser() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    
    // 如果没有默认用户，则创建
    let needsUpdate = false;
    
    if (!users['123']) {
        users['123'] = '456';
        needsUpdate = true;
    }
    
    if (!users['fang']) {
        users['fang'] = 'hao';
        needsUpdate = true;
    }
    
    if (needsUpdate) {
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// 添加新的账号选择功能
function fillUserInfo() {
    const select = document.getElementById('userSelect');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    
    // 清空密码
    password.value = '';
    
    if (select.value === '123') {
        username.value = '123';
        password.value = '456';
    } else if (select.value === 'fang') {
        username.value = 'fang';
        password.value = 'hao';
    } else {
        username.value = '';
    }
}

// 页面加载时初始化
window.onload = function() {
    initDefaultUser();
    
    // 如果是从切换账号过来的，清除当前用户
    if (window.location.search.includes('switch=true')) {
        localStorage.removeItem('currentUser');
    }
} 