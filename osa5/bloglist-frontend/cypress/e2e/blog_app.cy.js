describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'amanda h',
      username: 'amanda',
      password: 'salasana'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  })

  it('Login form is shown', function() {
    cy.contains('log in').click()
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('amanda')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('amanda h logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('amanda')
      cy.get('#password').type('salainensana')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
      cy.get('html').should('not.contain', 'amanda h logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'amanda', password: 'salasana' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('React patterns')
      cy.get('#author-input').type('Michael Chan')
      cy.get('#url-input').type('https://reactpatterns.com/')
      cy.get('#add-button').click()
    })

    describe('and when a blog exists', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('#title-input').type('React patterns')
        cy.get('#author-input').type('Michael Chan')
        cy.get('#url-input').type('https://reactpatterns.com/')
        cy.get('#add-button').click()
      })

      it('user can like a blog', function() {
        cy.contains('React patterns')
        cy.get('#view-button').click()

        cy.get('#like-button').click()
        cy.contains('1')
      })

      it('user can delete their blog', function() {
        cy.contains('React patterns')
        cy.get('#view-button').click()

        cy.get('#delete-button').click()
        cy.get('html').should('not.contain', 'React patterns')
      })

      it('user who does not own the blog cannot delete it', function() {
        cy.contains('logout').click()
        const second_user = {
          name: 'Not Amanda',
          username: 'not_amanda',
          password: 'salainensana'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', second_user)
        cy.login({ username: 'not_amanda', password: 'salainensana' })
        cy.contains('Not Amanda logged in')

        cy.contains('React patterns').contains('view').click()
        cy.contains('delete').should('not.exist')
      })

      it('Blogs are sorted by likes', function() {
        cy.contains('add new blog').click()
        cy.get('#title-input').type('Go To Statement Considered Harmful')
        cy.get('#author-input').type('Edsger W. Dijkstra')
        cy.get('#url-input').type('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
        cy.get('#add-button').click()

        cy.get('.blog').eq(0).should('contain', 'React patterns')
        cy.get('.blog').eq(1).should('contain', 'Go To Statement Considered Harmful')

        cy.contains('React patterns').parent().find('button').contains('view').click()
        cy.contains('Michael Chan').parent().contains('0').find('button').contains('like').click()
        cy.contains('Michael Chan').parent().contains('1')
        cy.contains('Michael Chan').parent().find('button').contains('hide').click()

        cy.contains('Go To Statement Considered Harmful').parent().find('button').contains('view').click()
        cy.contains('Edsger W. Dijkstra').parent().contains('0').find('button').contains('like').click()
        cy.contains('Edsger W. Dijkstra').parent().contains('1').find('button').contains('like').click()
        cy.contains('Edsger W. Dijkstra').parent().contains('2')
        cy.contains('Edsger W. Dijkstra').parent().find('button').contains('hide').click()

        cy.get('.blog').eq(0).should('contain', 'Go To Statement Considered Harmful')
        cy.get('.blog').eq(1).should('contain', 'React patterns')
      })
    })
  })
})