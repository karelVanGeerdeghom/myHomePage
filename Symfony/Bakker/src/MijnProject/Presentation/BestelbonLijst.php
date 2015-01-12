<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">
        <title>Bestelbonlijst</title>
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
        <h1>Bestelbonlijst</h1>
        <table>
            <tr>
                <th></th>
                <th></th>
                <th>Bestelbonnr</th>
                <th>Klant</th>
                <th>Besteldatum</th>
                <th>Afhaaldatum</th>
                <th>Totaal</th>
                <th></th>
            </tr>
            {% for bestelbon in bestelbonlijst %}
            <tr>
                <td>
                    <form action="bestelbonactief.php" method="get">
                        <input type="submit" value="" class="active{{ bestelbon.actief }}">
                        <input type="text" name="nr" value="{{ bestelbon.nr }}" hidden="hidden">
                        <input type="text" name="actief" value="{{ bestelbon.actief }}" hidden="hidden">
                    </form>
                </td>
                <td>
                    <form action="bestelbonafhaal.php" method="get">
                        <input type="submit" value="" class="active{{ bestelbon.afgehaald }}">
                        <input type="text" name="nr" value="{{ bestelbon.nr }}" hidden="hidden">
                        <input type="text" name="afgehaald" value="{{ bestelbon.afgehaald }}" hidden="hidden">
                    </form>
                </td>
                <td>{{ bestelbon.nr }}</td>
                <td>{{ bestelbon.klant.voornaam }} {{ bestelbon.klant.naam }}</td>
                <td>{{ bestelbon.besteldatum }}</td>
                <td>{{ bestelbon.afhaaldatum }}</td>
                <td>{{ bestelbon.totaal }} €</td>
                <td><a href="bonregeltoonalle.php?nr={{ bestelbon.nr }}" target="_blank">Toon</a></td>
            </tr>
            {% endfor %}
        </table>
    </body>
</html>