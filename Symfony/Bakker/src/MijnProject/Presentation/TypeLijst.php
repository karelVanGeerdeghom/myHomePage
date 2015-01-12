<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">
        <title>Typelijst</title>
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
        <h1>Typelijst</h1>
        <table>
            <tr></tr>
            <tr>
                <th></th><th></th><th>Omschrijving</th>
            </tr>
            {% for type in typelijst %}
            <tr>
                <td>
                    <form action="typeschakel.php" method="get">
                        <input type="submit" value="" class="active{{ type.actief }}">
                        <input type="text" name="id" value="{{ type.id }}" hidden="hidden">
                        <input type="text" name="actief" value="{{ type.actief }}" hidden="hidden">
                    </form>
                </td>
                <td><a href="typebewerk.php?id={{ type.id }}">Edit</a></td>
                <td>{{ type.omschrijving }}</td>
            </tr>
            {% endfor %}
        </table>
    </body>
</html>