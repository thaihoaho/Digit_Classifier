# Giao diện kiểm thử mô hình học máy bằng React

## Mục tiêu

- Cho phép người dùng vẽ tay chữ số và nhận kết quả dự đoán từ mô hình học máy.

## Công nghệ

- **Vite + React**: Giao diện người dùng.
- **Flask**: Backend xử lý ảnh và gọi mô hình.
- **joblib**: Lưu trữ và nạp mô hình học máy.

## Chức năng chính

- Vẽ chữ số trên canvas.
- `Dự đoán với KNN`, `Dự đoán với Neural Network`.
- Hiển thị kết quả dự đoán từ backend.

## Kết nối Backend

- Gửi ảnh vẽ tay đến backend Flask qua HTTP POST.
- Backend trả về kết quả dự đoán dưới dạng JSON.

## Hướng dẫn cài đặt

### Cài đặt yêu cầu phần mềm

- **Python 3.x**, **Node.js**.

### Cài đặt ứng dụng từ github

Clone mã nguồn (nếu chưa có):

```bash
git clone https://github.com/thaihoaho/digit-classifier.git
```

Cài đặt frontend:

```bash
cd digit-classifier
npm install
npm start
```

Cài đặt backend:

```bash
cd backend
pip install -r requirements.txt
python3 app.py
```

Truy cập ứng dụng tại `http://localhost:3000`.
