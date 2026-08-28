# 🏦 Bank Sampah Management System

REST API untuk sistem manajemen Bank Sampah digital. Memungkinkan nasabah menyetor sampah, mendapat saldo, dan melakukan penarikan. Backend ini dibangun dengan fokus pada **security, scalability, dan clean architecture**.

[![Node.js](https://img.shields.io/badge/Node.js-18-green)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.x-blue)](https://expressjs.com)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)](https://mysql.com)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-blue)](https://sequelize.org)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 📋 Project Overview

Bank Sampah Management System adalah platform digital yang memfasilitasi pengelolaan sampah menjadi bernilai ekonomis. Sistem ini memiliki 3 role pengguna dengan hak akses berbeda, transaction logging untuk audit, dan berbagai fitur keamanan standar industri.

**Tujuan Project:**
- Showcase kemampuan Backend Engineering (REST API, security, database design)
- Implementasi best practices: layered architecture, RBAC, JWT auth
- Production-ready code dengan proper error handling & testing
- Clean, well-documented codebase untuk portfolio

---

## ✨ Features

### Authentication & Authorization
- ✅ Register & Login dengan JWT
- ✅ Role-Based Access Control (Admin, Petugas, Nasabah)
- ✅ Bcrypt password hashing (salt rounds configurable)
- ✅ Rate limiting untuk mencegah brute force
- ✅ Token expiration & refresh

### Core Features
- ✅ User management (CRUD oleh admin)
- ✅ Jenis sampah management (master data)
- ✅ Transaksi setor sampah (dengan auto-calculate harga)
- ✅ Saldo nasabah (auto-update saat transaksi)
- ✅ Penarikan saldo (dengan approval workflow)
- ✅ Riwayat transaksi (filtered by user)
- ✅ Audit log (semua aksi penting tercatat)
- ✅ Dashboard statistics (per role)

### Security
- ✅ Helmet (security HTTP headers)
- ✅ CORS configuration
- ✅ SQL Injection protection (Sequelize ORM parameterized queries)
- ✅ Input validation (express-validator)
- ✅ IDOR protection (ownership filter)
- ✅ Secure error handling (no stack trace leak)
- ✅ Rate limiting
- ✅ Environment-based configuration

### DevOps
- ✅ Docker & Docker Compose
- ✅ Jest + Supertest unit tests
- ✅ Swagger/OpenAPI documentation
- ✅ Sequelize migrations & seeders
- ✅ Winston logging

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 18+ |
| Framework | Express.js 4.x |
| Database | MySQL 8.0 |
| ORM | Sequelize 6.x |
| Auth | JWT (jsonwebtoken) |
| Hashing | bcrypt |
| Validation | express-validator |
| Security | helmet, cors, express-rate-limit |
| Testing | Jest, Supertest |
| Documentation | Swagger/OpenAPI |
| Logging | Winston, Morgan |
| Containerization | Docker, Docker Compose |

---

## 🏗️ Architecture

Menggunakan **Layered Architecture** dengan separation of concerns:

