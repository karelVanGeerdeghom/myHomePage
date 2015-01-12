<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">
        <title>KlantForm</title>
    </head>
    <body>
        <h1>Klant</h1>
        {% if error == 'emailexists' %}
            <p style='color:red'>Email bestaat al!</p>
        {% endif %}
        <form method="post" action="{{ action }}">
            <input type="text" name="nr" value="{{ klant.nr }}" hidden="hidden">
            <input type="text" name="pass" value="{{ klant.pass }}" hidden="hidden">
            <table>
                <tr>
                    <td>Email:</td>
                    <td><input type="text" name="email" value="{{ klant.email }}"></td>
                </tr>
                <tr>
                    <td>Naam:</td>
                    <td><input type="text" name="naam" value="{{ klant.naam }}"></td>
                </tr>
                <tr>
                    <td>Voornaam:</td>
                    <td><input type="text" name="voornaam" value="{{ klant.voornaam }}"></td>
                </tr>
                <tr>
                    <td>Adres:</td>
                    <td><input type="text" name="adres" value="{{ klant.adres }}"></td>
                </tr>
                <tr>
                    <td>Gemeente:</td>
                    <td>
                        <select name="postid">
                            {% for postcode in postcodelijst %}
                            <option value="{{ postcode.id }}" {% if klant.postid.id == postcode.id %} selected {% endif %}>
                                {{ postcode.postcode }} - {{ postcode.gemeente }}
                            </option>
                            {% endfor %}
                        </select>
                    </td>
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