/**
 * skenario testing:
 * - Login spec
 *   - should display the login page correctly
 *   - should display an alert when the email or password is wrong
 *   - should display the homepage and the logged-in user's name when
 *     login succeeds
 *
 * Catatan implementasi:
 * Seluruh panggilan ke Forum API (https://forum-api.dicoding.dev/v1)
 * di-stub menggunakan cy.intercept agar pengujian E2E ini deterministik,
 * cepat, dan tidak bergantung pada akun/data sungguhan di server.
 */

const fakeUser = {
  id: 'users-1',
  name: 'Dimas Saputra',
  email: 'dimas@mail.com',
  avatar: 'https://generated-image-url.jpg',
};

function stubFailedPreload() {
  // Saat aplikasi pertama kali dimuat, App akan memanggil GET /users/me
  // untuk memeriksa apakah ada sesi login yang tersimpan. Karena belum
  // ada token yang valid, permintaan ini "gagal" sehingga authUser diisi
  // dengan null dan halaman login dapat tampil.
  cy.intercept('GET', /\/users\/me(\?.*)?$/, {
    statusCode: 401,
    body: { status: 'fail', message: 'Missing authentication' },
  }).as('preloadProfile');
}

describe('Login spec', () => {
  beforeEach(() => {
    stubFailedPreload();
  });

  it('should display the login page correctly', () => {
    cy.visit('/login');

    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Kata sandi"]').should('be.visible');
    cy.contains('button', 'Masuk').should('be.visible');
  });

  it('should display an alert when the email or password is wrong', () => {
    cy.intercept('POST', /\/login$/, {
      statusCode: 401,
      body: { status: 'fail', message: 'email atau password yang Anda masukkan salah' },
    }).as('loginRequest');

    cy.visit('/login', {
      onBeforeLoad(win) {
        cy.stub(win, 'alert').as('alertStub');
      },
    });

    cy.get('input[placeholder="Email"]').type('salah@mail.com');
    cy.get('input[placeholder="Kata sandi"]').type('passwordsalah');
    cy.contains('button', 'Masuk').click();

    cy.wait('@loginRequest');
    cy.get('@alertStub').should('have.been.calledWith', 'email atau password yang Anda masukkan salah');
    // tetap berada di halaman login karena proses login gagal
    cy.url().should('include', '/login');
  });

  it("should display the homepage and the logged-in user's name when login succeeds", () => {
    cy.intercept('POST', /\/login$/, {
      statusCode: 200,
      body: { status: 'success', message: 'ok', data: { token: 'fake-token' } },
    }).as('loginRequest');

    cy.intercept('GET', /\/users$/, {
      statusCode: 200,
      body: { status: 'success', message: 'ok', data: { users: [] } },
    }).as('getUsers');

    cy.intercept('GET', /\/threads$/, {
      statusCode: 200,
      body: { status: 'success', message: 'ok', data: { threads: [] } },
    }).as('getThreads');

    cy.visit('/login');

    // Tunggu halaman login benar-benar tampil (memastikan preload check
    // yang pertama sudah selesai) sebelum meng-override intercept
    // GET /users/me agar panggilan KEDUA (setelah login berhasil)
    // mengembalikan profil pengguna, bukan lagi respons gagal.
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.intercept('GET', /\/users\/me(\?.*)?$/, {
      statusCode: 200,
      body: { status: 'success', message: 'ok', data: { user: fakeUser } },
    }).as('getOwnProfile');

    cy.get('input[placeholder="Email"]').type(fakeUser.email);
    cy.get('input[placeholder="Kata sandi"]').type('password123');
    cy.contains('button', 'Masuk').click();

    cy.wait('@loginRequest');
    cy.wait('@getOwnProfile');

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.contains(fakeUser.name).should('be.visible');
  });
});
