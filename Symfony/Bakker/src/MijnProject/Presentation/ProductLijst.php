<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">
        <title>Productlijst</title>
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
        <h1>Productlijst</h1>
        <table>
            <tr>
                <th></th>
                <th></th>
                <th>Type</th>
                <th>Omschrijving</th>
                <th>Prijs</th>
            </tr>
            {% for product in productlijst %}
            <tr>
                <td>
                    <form action="productschakel.php" method="get">
                        <input type="submit" value="" class="active{{ product.actief }}">
                        <input type="text" name="id" value="{{ product.id }}" hidden="hidden">
                        <input type="text" name="actief" value="{{ product.actief }}" hidden="hidden">
                    </form>
                </td>
                <td><a href="productbewerk.php?id={{ product.id }}">Edit</a></td>
                <td>{{ product.typeid.omschrijving }}</td>
                <td>{{ product.omschrijving }}</td>
                <td>{{ product.prijs }}</td>
            </tr>
            {% endfor %}
        </table>
    </body>
</html>