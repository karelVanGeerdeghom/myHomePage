<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">
        <title>Klantlijst</title>
        <style>
            table { border-collapse:collapse; }
            td, th { border:1px solid black; padding: 3px; }
            th { background-color: #ddd; }
            .active1 {
                width: 1.5em;
                height: 1.5em;
                background-color: #00FF00;
            }
            .active0 {
                width: 1.5em;
                height: 1.5em;
                background-color: #FF0000;
            }
        </style>
    </head>
    <body>
        <h1>Klantlijst</h1>
        <table>
            <tr>
                <th></th><th></th>
                <th>Klantnr</th>
                <th>Email</th>
                <th>Naam</th>
                <th>Voornaam</th>
                <th>Adres</th>
                <th>Postcode</th>
                <th>Gemeente</th>
                <th>Bestellingen</th>
            </tr>
            {% for klant in klantlijst %}
            <tr>
                <td>
                    <form action="klantschakel.php" method="get">
                        <input type="submit" value="" class="active{{ klant.actief }}">
                        <input type="text" name="nr" value="{{ klant.nr }}" hidden="hidden">
                        <input type="text" name="actief" value="{{ klant.actief }}" hidden="hidden">
                    </form>
                </td>
                <td><a href="klantbewerk.php?nr={{ klant.nr }}">Edit</a></td>
                <td>{{ klant.nr }}</td>
                <td>{{ klant.email }}</td>
                <td>{{ klant.naam }}</td>
                <td>{{ klant.voornaam }}</td>
                <td>{{ klant.adres }}</td>
                <td>{{ klant.postid.postcode }}</td>
                <td>{{ klant.postid.gemeente }}</td>
                <td>{{ klant.bestellingen }}</td>
            </tr>
            {% endfor %}
        </table>
    </body>
</html>