# Forum Discussion App — Submission 2: Automation Testing & CI/CD

**URL Aplikasi (Vercel):** [dicoding-forum-applicationn.vercel.app](https://dicoding-forum-applicationn.vercel.app)

**Aplikasi:** Forum Discussion App
**Framework:** React + Vite + Redux
**Testing:** Vitest, React Testing Library, User Event, Cypress

---

## 1. Ringkasan Project

Submission ini menambahkan **Automation Testing** pada aplikasi Forum Discussion untuk memastikan fitur-fitur utama aplikasi dapat berjalan sesuai dengan yang diharapkan.

Pengujian dibagi menjadi tiga tingkat:

| Jenis Pengujian     | Tools                                       | Fokus Pengujian               |
| ------------------- | ------------------------------------------- | ----------------------------- |
| Unit Testing        | Vitest                                      | Reducer dan Thunk             |
| Integration Testing | Vitest + React Testing Library + User Event | Komponen React                |
| End-to-End Testing  | Cypress                                     | Alur aplikasi melalui browser |

**Vitest** dipilih karena project menggunakan Vite. Vitest menggunakan pipeline transform yang sama dengan Vite sehingga proses testing dapat dilakukan tanpa konfigurasi Babel atau Jest tambahan.

---

## 2. Tools yang Digunakan

| Tools                      | Kegunaan                                     |
| -------------------------- | -------------------------------------------- |
| React                      | Framework untuk membangun antarmuka aplikasi |
| Vite                       | Development server dan build tool            |
| Redux                      | State management aplikasi                    |
| Vitest                     | Unit dan integration testing                 |
| React Testing Library      | Testing komponen React                       |
| Testing Library User Event | Simulasi interaksi pengguna                  |
| jsdom                      | Environment browser untuk Vitest             |
| Cypress                    | End-to-End testing                           |
| start-server-and-test      | Menjalankan server sebelum E2E test          |

---

## 3. Persiapan Awal

Sebelum menjalankan project, pastikan sudah tersedia:

* Node.js dan npm
* Git
* Browser seperti Google Chrome
* Koneksi internet

Untuk mengecek Node.js dan npm:

```bash
node -v
npm -v
```

Disarankan menggunakan Node.js versi 20 atau lebih baru.

---

## 4. Instalasi Project

Jika project berasal dari repository GitHub, clone repository terlebih dahulu:

```bash
git clone <URL-REPOSITORY>
```

Kemudian masuk ke folder project:

```bash
cd forum-app
```

Install seluruh dependency:

```bash
npm install
```

Perintah `npm install` akan meng-install seluruh dependency aplikasi dan dependency yang digunakan untuk testing.

Dependency testing yang digunakan antara lain:

* `vitest`
* `@testing-library/react`
* `@testing-library/jest-dom`
* `@testing-library/user-event`
* `jsdom`
* `cypress`
* `start-server-and-test`

> **Catatan:** Instalasi Cypress membutuhkan koneksi internet karena Cypress perlu mengunduh binary test runner.

---

# 5. Menjalankan Aplikasi

Setelah seluruh dependency selesai di-install, jalankan development server:

```bash
npm run dev
```

Aplikasi secara default dapat diakses melalui:

```text
http://localhost:5173
```

Buka alamat tersebut menggunakan browser.

### Build Production

Untuk memastikan aplikasi dapat dibuat menjadi production build:

```bash
npm run build
```

Jika berhasil, Vite akan menghasilkan folder:

```text
dist/
```

---

# 6. Automation Testing

Automation testing pada project ini terdiri dari:

1. Unit Testing Reducer
2. Unit Testing Thunk Function
3. Integration Testing React Component
4. End-to-End Testing menggunakan Cypress

---

## 6.1 Unit Testing — Reducer

Reducer merupakan bagian dari Redux yang bertugas mengubah state berdasarkan action yang diterima.

### `threads/reducer.test.js`

Lokasi file:

```text
src/states/threads/reducer.test.js
```

File ini digunakan untuk menguji `threadsReducer`, yaitu reducer yang menangani state daftar thread.

Skenario yang diuji meliputi:

* action tidak dikenal
* menerima daftar thread
* menambahkan thread baru
* melakukan up vote
* melakukan down vote
* melakukan toggle vote
* berpindah dari down vote ke up vote
* memastikan thread lain tidak ikut berubah

Total terdapat **10 skenario pengujian**.

---

### `threadDetail/reducer.test.js`

Lokasi file:

```text
src/states/threadDetail/reducer.test.js
```

File ini digunakan untuk menguji `threadDetailReducer`.

Skenario pengujian mencakup:

* action tidak dikenal
* menerima detail thread
* membersihkan detail thread
* menambahkan komentar
* melakukan vote pada thread
* melakukan toggle vote pada thread
* melakukan up vote pada komentar
* melakukan down vote pada komentar
* melakukan neutralize vote pada komentar

Total terdapat **12 skenario pengujian**.

---

## 6.2 Unit Testing — Thunk Function

Thunk digunakan untuk menangani proses asynchronous, seperti login dan komunikasi dengan API.

### `authUser/action.test.js`

Lokasi file:

```text
src/states/authUser/action.test.js
```

File ini menguji thunk:

```text
asyncSetAuthUser
```

Skenario yang diuji:

1. Login berhasil.
2. `api.login` dipanggil dengan data yang benar.
3. `api.putAccessToken` dipanggil setelah login berhasil.
4. `showLoading` dijalankan sebelum proses login.
5. `setAuthUserActionCreator` dijalankan setelah login berhasil.
6. `hideLoading` dijalankan setelah proses selesai.
7. Login gagal dan menghasilkan `alert`.
8. Thunk mengembalikan `false` ketika login gagal.

Pengujian diringkas menjadi **3 skenario utama**.

---

### `threads/action.test.js`

Lokasi file:

```text
src/states/threads/action.test.js
```

File ini menguji thunk:

```text
asyncUpVoteThread
```

Skenario yang diuji:

1. Melakukan optimistic update sebelum API dipanggil.
2. Memanggil `api.upVoteThread` atau `api.neutralizeThreadVote` sesuai status vote sebelumnya.
3. Melakukan rollback apabila API mengalami kegagalan.

Thunk menggunakan `getState()` untuk mengetahui kondisi vote sebelum request API dilakukan.

Total terdapat **3 skenario pengujian**.

API dimock menggunakan:

```javascript
vi.mock('../../utils/api')
```

Dengan cara tersebut, pengujian thunk tidak membutuhkan API Forum Discussion sungguhan.

---

# 7. Integration Testing — React Component

Integration testing digunakan untuk memastikan komponen React dapat menerima props, menampilkan data, merespons input pengguna, dan menjalankan callback dengan benar.

Tools yang digunakan:

* Vitest
* React Testing Library
* `@testing-library/user-event`
* jsdom

---

## 7.1 `LoginInput.test.jsx`

Lokasi file:

```text
src/components/LoginInput.test.jsx
```

Pengujian meliputi:

* input email berhasil ditampilkan
* input password berhasil ditampilkan
* email dapat diisi
* password dapat diisi
* form dapat disubmit
* fungsi `login()` dipanggil
* payload yang dikirim ke `login()` sesuai dengan data yang dimasukkan pengguna

Total terdapat **5 skenario pengujian**.

---

## 7.2 `VoteButton.test.jsx`

Lokasi file:

```text
src/components/VoteButton.test.jsx
```

Pengujian meliputi:

* jumlah up vote ditampilkan dengan benar
* jumlah down vote ditampilkan dengan benar
* class `--active` muncul ketika `isUpVoted` bernilai `true`
* class `--active` muncul ketika `isDownVoted` bernilai `true`
* `onUpVote` dipanggil ketika tombol up vote diklik
* `onDownVote` dipanggil ketika tombol down vote diklik

Total terdapat **6 skenario pengujian**.

---

# 8. End-to-End Testing — Cypress

End-to-End testing digunakan untuk menguji aplikasi dari sudut pandang pengguna secara langsung melalui browser.

File pengujian:

```text
cypress/e2e/login/spec.cy.js
```

Pengujian difokuskan pada alur login aplikasi.

## Skenario yang Diuji

### 1. Halaman Login

Memastikan halaman login menampilkan:

* input email
* input password
* tombol `Masuk`

### 2. Login dengan Data yang Salah

Memastikan alert muncul ketika pengguna memasukkan email atau password yang salah.

### 3. Login Berhasil

Memastikan pengguna:

* berhasil melakukan login
* diarahkan ke halaman utama
* nama pengguna ditampilkan pada navigasi

---

## 8.1 API Mocking dengan `cy.intercept`

Request ke Forum API:

```text
https://forum-api.dicoding.dev/v1
```

di-*stub* menggunakan:

```javascript
cy.intercept()
```

Tujuan penggunaan API mocking adalah agar pengujian:

* tidak bergantung pada akun sungguhan
* tidak bergantung pada data server
* lebih stabil
* lebih cepat
* menghasilkan hasil yang konsisten

Dengan demikian, Cypress menggunakan response yang sudah ditentukan di dalam test.

> Jika ingin menguji aplikasi menggunakan API sungguhan, konfigurasi `cy.intercept()` dapat disesuaikan. Namun, untuk automation testing, penggunaan mock lebih disarankan agar test bersifat deterministik.

---

# 9. Menjalankan Automation Testing

## 9.1 Menjalankan Unit dan Integration Test

Untuk menjalankan seluruh test menggunakan Vitest:

```bash
npm test
```

Test yang akan dijalankan meliputi:

* Reducer
* Thunk
* React Component

---

## 9.2 Menjalankan Test dalam Mode Watch

Untuk menjalankan Vitest dalam mode watch:

```bash
npm run test:watch
```

Mode ini berguna saat proses development karena test akan dijalankan kembali ketika terdapat perubahan pada file.

---

## 9.3 Menjalankan End-to-End Test

Untuk menjalankan Cypress secara headless:

```bash
npm run e2e
```

Perintah tersebut menggunakan `start-server-and-test`.

Prosesnya adalah:

```text
npm run e2e
      │
      ▼
Menjalankan npm run dev
      │
      ▼
Menunggu http://localhost:5173
      │
      ▼
Menjalankan Cypress
      │
      ▼
Test selesai
      │
      ▼
Development server dihentikan
```

Dengan konfigurasi tersebut, development server tidak perlu dijalankan secara manual pada terminal lain.

---

## 9.4 Membuka Cypress Test Runner

Jika ingin menjalankan Cypress secara interaktif:

```bash
npm run cy:open
```

Cypress Test Runner akan terbuka dan memungkinkan test dipilih serta dijalankan secara manual.

---

# 10. Struktur File Testing

Struktur file testing pada project:

```text
forum-discussion-app/
│
├── src/
│   ├── components/
│   │   ├── LoginInput.test.jsx
│   │   └── VoteButton.test.jsx
│   │
│   └── states/
│       ├── authUser/
│       │   └── action.test.js
│       │
│       ├── threads/
│       │   ├── action.test.js
│       │   └── reducer.test.js
│       │
│       └── threadDetail/
│           └── reducer.test.js
│
├── cypress/
│   └── e2e/
│       └── login.cy.js
│
├── cypress.config.js
├── vite.config.js
├── package.json
└── README.md
```

---

# 11. Ringkasan Test Case

Berikut jumlah test case berdasarkan jenis pengujiannya:

| Jenis Pengujian | File                           | Jumlah Test |
| --------------- | ------------------------------ | ----------: |
| Reducer         | `threads/reducer.test.js`      |          10 |
| Reducer         | `threadDetail/reducer.test.js` |          12 |
| Thunk           | `authUser/action.test.js`      |           3 |
| Thunk           | `threads/action.test.js`       |           3 |
| Component       | `LoginInput.test.jsx`          |           5 |
| Component       | `VoteButton.test.jsx`          |           6 |
| **Total**       | **6 file**                     |      **39** |

Hasil pengujian:

```text
39/39 test passed
0 test failed
```

---

# 12. Verifikasi Project

Selain automation testing, project juga diverifikasi menggunakan linting dan production build.

## 12.1 Testing

Jalankan:

```bash
npm test
```

Hasil:

```text
39/39 test passed
```

---

## 12.2 Linting

Jalankan:

```bash
npm run lint
```

Hasil:

```text
No lint errors
```

---

## 12.3 Production Build

Jalankan:

```bash
npm run build
```

Hasil:

```text
Production build berhasil
```

---

# 13. Catatan Cypress

Pada saat proses penyiapan project di lingkungan sandbox, Cypress tidak dapat menjalankan test runner karena environment tersebut tidak memiliki akses jaringan ke:

```text
https://download.cypress.io
```

Akibatnya, binary Cypress tidak dapat diunduh pada environment tersebut.

Namun, konfigurasi dan spec Cypress telah disiapkan dan divalidasi secara sintaks.

Untuk menjalankan Cypress secara penuh pada komputer lokal, pastikan komputer memiliki akses internet kemudian jalankan:

```bash
npm install
npm run e2e
```

Cypress kemudian akan menjalankan End-to-End test pada browser secara headless.

---

# 14. Urutan Menjalankan Project

Jika project baru pertama kali dijalankan, gunakan urutan berikut.

### Step 1 — Install Dependency

```bash
npm install
```

### Step 2 — Jalankan Aplikasi

```bash
npm run dev
```

Aplikasi tersedia di:

```text
http://localhost:5173
```

### Step 3 — Jalankan Unit dan Integration Test

Buka terminal baru:

```bash
npm test
```

Pastikan seluruh test berhasil.

### Step 4 — Jalankan Lint

```bash
npm run lint
```

Pastikan tidak terdapat error.

### Step 5 — Jalankan Production Build

```bash
npm run build
```

Pastikan proses build berhasil.

### Step 6 — Jalankan E2E Test

```bash
npm run e2e
```

Cypress akan otomatis:

1. menjalankan development server
2. menunggu server siap
3. menjalankan test
4. menyelesaikan pengujian
5. mematikan development server

---

# 15. Kesimpulan

Automation Testing pada Forum Discussion App mencakup pengujian pada tiga level.

### Unit Testing

Digunakan untuk menguji logic pada:

* Redux reducer
* Redux thunk

Menggunakan **Vitest**.

### Integration Testing

Digunakan untuk menguji interaksi komponen React dengan pengguna.

Menggunakan:

* Vitest
* React Testing Library
* User Event
* jsdom

### End-to-End Testing

Digunakan untuk menguji alur aplikasi secara keseluruhan melalui browser.

Menggunakan **Cypress**.

Secara keseluruhan, terdapat **39 test case** pada Unit dan Integration Testing, dan seluruh test berhasil dijalankan:

```text
39/39 test passed
```

Selain itu, project juga berhasil melewati proses linting dan production build.
