<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">
        <title>TypeForm</title>
    </head>
    <body>
        <h1>Type</h1>
        {% if error == 'typeexists' %}
            <p style='color:red'>Type bestaat al!</p>
        {% endif %}
        <form method="post" action="{{ action }}">
            <input type="text" name="id" value="{{ type.id }}" hidden="hidden">
            <table>
                <tr>
                    <td>Omschrijving:</td>
                    <td><input type="text" name="omschrijving" value="{{ type.omschrijving }}"></td>
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