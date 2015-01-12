<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8">
        <title>ProductForm</title>
    </head>
    <body>
        <h1>Product</h1>
        {% if error == 'productexists' %}
            <p style='color:red'>Product bestaat al!</p>
        {% endif %}
        <form method="post" action="{{ action }}"  enctype="multipart/form-data">
            <input type="text" name="id" value="{{ product.id }}" hidden="hidden">
            <table>
                <tr>
                    <td>Type:</td>
                    <td>
                        <select name="typeid">
                            {% for type in typelijst %}
                            <option value="{{ type.id }}" {% if product.typeid.id == type.id %} selected {% endif %}>
                                {{ type.omschrijving }}
                            </option>
                            {% endfor %}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Omschrijving:</td>
                    <td><input type="text" name="omschrijving" value="{{ product.omschrijving }}"></td>
                </tr>
                <tr>
                    <td>Prijs:</td>
                    <td><input type="text" name="prijs" value="{{ product.prijs }}"></td>
                </tr>
                <tr>
                    <td>Afbeelding:</td>
                    <td><input type="file" name="pic"></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <input type="submit" value="Bewerken/Toevoegen">
                    </td>
                </tr>
            </table>
        </form>
    </body>
</html>