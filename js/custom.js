//Check Validate Search Home
function checkValidateSearch() {
	var input = document.getElementById('myInput');
	var btn = document.getElementById('myBtnSearch');

	if (input.value == '') {
		alert('Không nhận đuộc thông tin tìm kiếm \nTìm kiếm rỗng!!!');
		console.log('Error');
	} else {
		input.addEventListener('keyup', (e) => {
			e.preventDefault();
			if (e.keyCode === 13) {
				console.log('Enter Keypress');
				btn.click();
				window.location.href = 'search.html';
			}
		});
		btn.addEventListener('click', () => {
			console.log('Button clicked');
			window.location.href = 'search.html';
		});
	}
}
//Check Key Search
function checkkeySearch(e) {
	var key = e.which || e.keyCode;
	if (key == 32) doSearch();
}
//Check Key Search
function doSearch() {
	var frm = document.forms['frm-search'];
	if (frm.words.value.length > 0) frm.submit();
}
//Show Key Search in Search.html
function showSearch() {
	var url = new URL(window.location);
	var ws = url.searchParams.get('words');
	document.getElementById('searchDetail').innerHTML =
		"</br><h2>Từ khóa bạn tìm kiếm:</h2></br><h1 class='text-search'>" +
		ws +
		'</h1>';
}
//Open Cart On Page
function openCart() {
	window.location.href = 'order.html';
}

//List Item Product
var itemList = {
	sp01: { name: 'Trái Táo', price: 30000, photo: 'images/traitao.jpg' },

	sp02: { name: 'Trái Cherry', price: 210000, photo: 'images/traicherry.jpg' },

	sp03: { name: 'Trái Kiwi', price: 220000, photo: 'images/traikiwi.jpg' },

	sp04: { name: 'Trái Chanh', price: 15000, photo: 'images/traichanh.jpg' },

	sp05: { name: 'Trái Xoài', price: 10000, photo: 'images/traixoai.jpg' },

	sp06: { name: 'Trái Dưa Hấu', price: 10000, photo: 'images/traiduahau.jpg' },

	sp07: { name: 'Trái Dâu', price: 100000, photo: 'images/traidau.jpg' },

	sp08: { name: 'Trái Dứa', price: 13000, photo: 'images/traidua.jpg' },

	sp09: { name: 'Trái Cam', price: 30000, photo: 'images/traicam.jpg' },

	sp10: { name: 'Trái Quýt', price: 27000, photo: 'images/traiquyt.jpg' },

	sp11: { name: 'Trái Mận', price: 45000, photo: 'images/traiman.jpg' },

	sp12: { name: 'Trái Hồng', price: 60000, photo: 'images/traihong.jpg' },

	sp13: { name: 'Trái Mây', price: 50000, photo: 'images/traimay.jpg' },

	sp14: { name: 'Trái Ổi', price: 18000, photo: 'images/traioi.jpg' },

	sp15: { name: 'Trái Vải', price: 50000, photo: 'images/traivai.jpg' },
	sp16: { name: 'Trái Đào', price: 20000, photo: 'images/traidao.jpg' },
	sp17: {
		name: 'Cà Chua Đà Lạt',
		price: 80000,
		photo: '/images/cachuadalat.png',
	},
	sp18: {
		name: 'Nho Nhật Bản',
		price: 2950000,
		photo: '/images/nhonoidia.jpg',
	},
	sp19: { name: 'Trái Bơ', price: 65000, photo: '/images/quabo.jpg' },
	sp20: { name: 'Trái Bưởi', price: 80000, photo: '/images/traibuoi.jpeg' },
	sp21: { name: 'Cà Rốt', price: 15000, photo: '/images/carot.jpg' },
	sp22: {
		name: 'Ớt Chuông Đỏ',
		price: 60000,
		photo: '/images/otchuongdo.webp',
	},
	sp23: {
		name: 'Súp Lơ Đà Lạt',
		price: 25000,
		photo: '/images/suplodalat.jpg',
	},
	sp24: {
		name: 'Khoai Lang Mật Đà Lạt',
		price: 30000,
		photo: '/images/khoailangmat.jpg',
	},
};

// Add Cart Product Page
function addCart(code) {
	let number = parseInt(document.getElementById(code).value);
	if (number == 0) return;
	if (typeof localStorage[code] === 'undefined') {
		window.localStorage.setItem(code, number);
		alert('Đặt hàng thành công. Tổng số lượng đã đặt là: ' + number + '.');
	} else {
		current = parseInt(window.localStorage.getItem(code));
		if (number + current > 100) {
			window.localStorage.setItem(code, 100);
			alert(
				'Tổng số lượng đặt hàng không thể vượt quá 100. Đặt hàng với số lượng: ' +
					(100 - current) +
					'.',
			);
			return;
		} else {
			window.localStorage.setItem(code, number + current);
			alert(
				'Đặt hàng thành công. Tổng số lượng đã đặt là: ' +
					(number + current) +
					'.',
			);
		}
	}
}

//Remove Cart Product
function removeCart(code) {
	if (typeof window.localStorage[code] !== 'undefined') {
		window.localStorage.removeItem(code);
		document
			.getElementById('cartDetail')
			.getElementsByTagName('tbody')[0].innerHTML = '';
		showCart();
	}
}

// Count Discount
function getDiscountRate() {
	var d = new Date();
	var weekday = d.getDay();
	var totalMins = d.getHours() * 60 + d.getMinutes();
	if (
		weekday >= 1 &&
		weekday <= 3 &&
		((totalMins >= 420 && totalMins <= 660) ||
			(totalMins >= 780 && totalMins <= 1020))
	)
		return 0.1;
	return 0;
}

//Show Cart Product Page
function showCart() {
	var formatter = new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	});
	var container = document
		.getElementById('cartDetail')
		.getElementsByTagName('tbody')[0];
	container.innerHTML = '';

	var sum = 0;
	var totalPreTax = 0;
	var discountRate = getDiscountRate();
	var taxRate = 0.1;
	var discount = 0;
	var tax = 0;

	for (var i = 0; i < window.localStorage.length; i++) {
		if (typeof itemList[localStorage.key(i)] === 'undefined') continue;
		var tr = document.createElement('tr');
		var photoCell = document.createElement('td');
		var nameCell = document.createElement('td');
		var priceCell = document.createElement('td');
		var numberCell = document.createElement('td');
		var sumCell = document.createElement('td');
		var removeCell = document.createElement('td');
		var removeLink = document.createElement('a');

		var item = itemList[localStorage.key(i)];
		var number = localStorage.getItem(localStorage.key(i));

		tr.style.textAlign = 'center';
		photoCell.style.textAlign = 'center';
		photoCell.innerHTML =
			"<img src='" + item.photo + "' class='round-figure' width='200px'/>";

		nameCell.innerHTML = item.name;
		priceCell.innerHTML = formatter.format(item.price);
		priceCell.style.textAlign = 'center';

		numberCell.innerHTML = number;
		numberCell.style.textAlign = 'center';

		sum = number * item.price;
		sumCell.innerHTML = formatter.format(sum);
		sumCell.style.textAlign = 'center';

		removeLink.innerHTML = "<i class='fa fa-trash'></i>";

		removeLink.setAttribute('href', '#');
		removeLink.setAttribute('data-code', localStorage.key(i));
		removeLink.onclick = function () {
			removeCart(this.dataset.code);
		};
		removeCell.style.textAlign = 'center';
		removeCell.appendChild(removeLink);

		tr.appendChild(photoCell);
		tr.appendChild(nameCell);
		tr.appendChild(numberCell);
		tr.appendChild(priceCell);
		tr.appendChild(sumCell);
		tr.appendChild(removeCell);
		container.appendChild(tr);
		totalPreTax += sum;
	}
	var discount = totalPreTax * discountRate;
	var tax = (totalPreTax - discount) * taxRate;
	document.getElementById('bill_pre_tax_total').innerHTML =
		formatter.format(totalPreTax);
	document.getElementById('bill_discount').innerHTML =
		discountRate + ' x A = ' + formatter.format(discount);
	document.getElementById('bill_tax').innerHTML = formatter.format(tax);
	document.getElementById('bill_total').innerHTML = formatter.format(
		totalPreTax - discount + tax,
	);
}
//Submit Cart Product
function submitCart() {
	var table = document
		.getElementById('cartDetail')
		.getElementsByTagName('tbody')[0];
	if (table.rows.length == 0) {
		alert('Không có sản phẩm nào trong giỏ hàng!');
		return;
	} else {
		alert('Đặt hàng thành công. Cảm ơn quý khách!');
		window.localStorage.clear();
		showCart();
	}
	// alert("Đặt hàng thành công. Cảm ơn quý khách đã mua hàng.");
}
//Form Login
function formLogin() {
	var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	var email = document.getElementById('input-email-login');
	var password = document.getElementById('input-psw-login');
	if (email.value == '' || password.value == '') {
		alert('Vui lòng nhập đầy đủ thông tin.');
	}
	if (emailReg.test(email.value) == false) {
		console.log('Email không hợp lệ.');
		return false;
	} else {
		console.log('Email hợp lệ.');
		alert('Đăng nhập thành công.');
		return true;
	}
}
//Form SignUp
function formSignUp() {
	var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	var email = document.getElementById('input-email-signup');
	var password = document.getElementById('input-psw-signup');
	var password2 = document.getElementById('input-psw2-signup');
	var checkbox = document.getElementById('checkbox');
	if (checkbox.checked == false) {
		(document.getElementById('error').innerHTML =
			'Vui lòng chấp nhận điều khoản!!!');
	}
	if (emailReg.test(email.value) == false) {
		console.log('Email không hợp lệ.');
	} else {
		console.log('Email hợp lệ.');
	}
	if (email.value == '' || password.value == '' || password2.value == '') {
		alert('Vui lòng nhập đầy đủ thông tin.');
	} else {
		alert('Đăng ký thành công.');
	}
	if (((password.value == '') === password2.value) == '') {
		console.log('Mật khẩu rỗng');
	}
}
//Form Contact
function formContact() {
	var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	var name = document.getElementById('name');
	var email = document.getElementById('email');
	var subject = document.getElementById('subject');
	var message = document.getElementById('message');
	if (emailReg.test(email.value) == false) {
		console.log('Email không hợp lệ.');
	} else {
		console.log('Email hợp lệ.');
	}
	if (
		name.value == '' ||
		email.value == '' ||
		subject.value == '' ||
		message.value == ''
	) {
		alert('Gửi thất bại!');
	} else {
		alert('Gửi thành công!');
	}
}

// Preloader
$('body').addClass('loader');
$(window).on('load', function () {
	$('body').addClass('loaded');
	var tooltipTriggerList = [].slice.call(
		document.querySelectorAll('[data-bs-toggle="tooltip"]'),
	);
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl);
	});
});
// Back To Top Scroll
var btn = $('#button-scroll');
$(window).scroll(function () {
	if ($(window).scrollTop() > 300) {
		btn.addClass('show');
	} else {
		btn.removeClass('show');
	}
});

btn.on('click', function (e) {
	e.preventDefault();
	$('html, body').animate({ scrollTop: 0 }, '300');
});