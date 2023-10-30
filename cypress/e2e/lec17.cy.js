/// <reference types="cypress" />

describe('ApiTesting', () => {
  const RandomISBN = Math.floor(Math.random() * 1000);
  const RandomAISLE = Math.floor(Math.random() * 1000);

  let fullNames = [
    'Alice fdas',
    'Bob kld',
    'Charlie fgggf',
    'David dffg',
    'Eve loly',
    'Frank boston',
    'Grace kjhn',
    'Helen uui',
    'Isaac jhjg',
    'Jack tytytf'
  ];

  // Generate a random author name index
  const randomauthername = Math.floor(Math.random() * fullNames.length);

  it('Test Post Method', () => {
    const requestBody = {
      name: "Qa private Zoom",
      isbn: RandomISBN,
      aisle: RandomAISLE,
      author: fullNames[randomauthername] // Use the random author name
    };

    cy.request({
      method: "POST",
      url: "https://rahulshettyacademy.com/Library/Addbook.php",
      body: requestBody
    }).then((Response) => {
      cy.log(Response.body);
      expect(Response.status).to.eq(200);
      expect(Response.body.Msg).to.eq("successfully added");
    });
  });

  it('Test Get Method', () => {
    cy.request({
      method: "GET",
      url: `https://rahulshettyacademy.com/Library/GetBook.php?ID=${RandomISBN}${RandomAISLE}`,
    }).then((Response) => {
      cy.log(Response.body[0].book_name);
      expect(Response.status).to.eq(200);
      expect(Response.body[0].author).to.eq(fullNames[randomauthername]); // Use the random author name
    });
  });

  it('Test Delete Method', () => {
    const requestBody = {
      "ID": `${RandomISBN}${RandomAISLE}`
    }
    cy.request({
      method: "DELETE",
      url: "https://rahulshettyacademy.com/Library/DeleteBook.php",
      body: requestBody,
    }).then((Response) => {
      cy.log(Response)
      expect(Response.status).to.eq(200); // Check the status code
      expect(Response.body.msg).to.eq("book is successfully deleted"); // Access the "msg" property
    });
  });
});
