<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">
        <title>Boodschaplijst</title>
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
        <h1>Boodschaplijst</h1>
        <table>
            <tr>
                <th></th>
                <th>Klant</th>
                <th>Datum</th>
                <th>Boodschap</th>
            </tr>
            {% for boodschap in boodschaplijst %}
            <tr>
                <td>
                    <form action="boodschapschakel.php" method="get">
                        <input type="submit" value="" class="active{{ boodschap.actief }}">
                        <input type="text" name="id" value="{{ boodschap.id }}" hidden="hidden">
                        <input type="text" name="actief" value="{{ boodschap.actief }}" hidden="hidden">
                    </form>
                </td>
                <td>{{ boodschap.klantnr.voornaam }} {{ boodschap.klantnr.naam }}</td>
                <td>{{ boodschap.datum }}</td>
                <td style="width: 900px">{{ boodschap.boodschap }}</td>
            </tr>
            {% endfor %}
        </table>
    </body>
</html>