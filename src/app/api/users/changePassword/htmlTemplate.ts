export function getPasswordResetEmail(newPassword: string) {
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
    </style>
</head>
<body>
    <div class="container">
        <h1>Su contraseña fue modificada</h1>
        <p>Su nueva contraseña temporal es: ${newPassword}</p>
    </div>
</body>
</html>
`;
}