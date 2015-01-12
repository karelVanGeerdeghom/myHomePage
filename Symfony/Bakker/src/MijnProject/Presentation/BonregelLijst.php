<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">
        <title>Bonregellijst</title>
        <style>
            table { border-collapse:collapse; }
            td, th { border:1px solid black; padding: 3px; }
            th { background-color: #ddd; }
        </style>
    </head>
    <body>
        <h1>Bonregellijst</h1>
        <table>
            <tr>
                <th>Bestelbonnr</th>
                <th>Omschrijving</th>
                <th>Aantal</th>
                <th>Prijs</th>
                <th>Totaal</th>
            </tr>
            {% for bonregel in bonregellijst %}
            <tr>
                <td>{{ bonregel.nr }}</td>
                <td>{{ bonregel.product.omschrijving }}</td>
                <td>{{ bonregel.aantal }}</td>
                <td>{{ bonregel.prijs }} €</td>
                <td>{{ bonregel.totaal }} €</td>
            </tr>
            {% endfor %}
        </table>
    </body>
</html>