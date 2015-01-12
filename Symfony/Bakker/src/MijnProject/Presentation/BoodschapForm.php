<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">
        <title>BoodschapForm</title>
    </head>
    <body>
        <h1>Boodschap</h1>
        <form method="post" action="{{ action }}">
            <input type="text" name="klantnr" value="1" hidden="hidden">
            <table>
                <tr>
                    <td>Boodschap:</td>
                    <td><input type="text" name="boodschap"></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <input type="submit" value="Toevoegen/Bewerken">
                    </td>
                </tr>
            </table>
        </form>
    </body>
</html>