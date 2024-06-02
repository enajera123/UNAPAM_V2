export function getPasswordResetEmail(newPassword: string) {

    // const resetLink = `http://localhost:3000/changePassword?token=${newPassword}` //Only for development
    const resetLink = `https://unapam-v2.vercel.app/changePassword?token=${newPassword}` //Only for production

    return `<!DOCTYPE html>
<!DOCTYPE html>
<html>
<head>
    <title>Modificación de contraseña</title>
    <style>
    .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background: rgb(3, 7, 13);
        background: linear-gradient(322.04deg, #ABABAB 2.25%, #5E5D5D 50.32%);
        color: #ffffff; 
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      }
        body {
            color: #c2c2c2; 
        }
        h1 {
            color: #FFF; 
        }
        p {
            color: #FFF; 
        }
        a {
            display: inline-block;
            background-color: #ABABAB;
            color: #FFF;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Reestablecimiento de contraseña</h1>
        <p>Para cambiar su contraseña, haz click en el siguiente enlace: </p>
        <a href="${resetLink}">Cambiar contraseña</a>
    </div>
</body>
</html>
`;
}