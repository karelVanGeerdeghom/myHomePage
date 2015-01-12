<!--inhoud--> 
<section>
    <div class="container">
        <h1>Boodschappenmandje</h1>
        {% if nota == "set" %}
            <div class="alert alert-success">Dankzij uw klantenkaart heeft u recht op {{ korting }} € korting!</div>
        {% endif %}
        {% if step == 1 %}
            <div class="row">
                <div class="col-md-1 col-md-offset-4">
                    <form action="cart.php" method="post">
                        <input type="submit" class="btn btn-default" value="Overzicht" disabled="disabled">
                    </form>
                </div>
                <div class="col-md-1">
                    <form action="cart.php?step=2" method="post">
                        <input type="submit" class="btn btn-success" value="Afhaling">
                    </form>
                </div>
                <div class="col-md-1">
                    <form action="cart.php?step=3" method="post">
                        <input type="submit" class="btn btn-success" value="Bevestiging">
                    </form>
                </div>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Aantal</th>
                        <th>Stukprijs</th>
                        <th>Subtotaal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {% for item in cart %}
                        <tr>
                            <td>{{ item.product.omschrijving }}</td>
                            <td>{{ item.aantal }}</td>
                            <td>{{ item.prijs }} €</td>
                            <td>{{ item.aantal * item.prijs }} €</td>
                            <td>
                                <form action="cartremove.php" method="post">
                                    <input type="submit" class="btn btn-xs" value="Verwijder">
                                    <input type="text" name="id" value="{{ item.productid }}" hidden="hidden">
                                </form>
                            </td>
                        </tr>
                    {% endfor %}
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Totaalprijs</th>
                        <th>{{ totaal }} €</th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        {% endif %}
        {% if step == 2 %}
            <div class="row">
                <div class="col-md-1 col-md-offset-4">
                    <form action="cart.php" method="post">
                        <input type="submit" class="btn btn-success" value="Overzicht">
                    </form>
                </div>
                <div class="col-md-1">
                    <form action="cart.php?step=2" method="post">
                        <input type="submit" class="btn btn-default" value="Afhaling" disabled="disabled">
                    </form>
                </div>
                <div class="col-md-1">
                    <form action="cart.php?step=3" method="post">
                        <input type="submit" class="btn btn-success" value="Bevestiging">
                    </form>
                </div>
            </div>
            <div class="row">
                <form action="setdays.php" method="post" class="form-horizontal">
                    <div class="form-group">
                        <label for="dagen" class="col-sm-3 control-label">Binnen hoeveel dagen afhalen?</label>
                        <div class="col-sm-2">
                            <input type="number" class="form-control" min="1" max="3" name="dagen" id="dagen" value="{{ dagen }}" onchange="this.form.submit()">
                        </div>
                    </div>
                </form>
            </div>
        {% endif %}
        {% if step == 3 %}
            <div class="row">
                <div class="col-md-1 col-md-offset-4">
                    <form action="cart.php" method="post">
                        <input type="submit" class="btn btn-success" value="Overzicht">
                    </form>
                </div>
                <div class="col-md-1">
                    <form action="cart.php?step=2" method="post">
                        <input type="submit" class="btn btn-success" value="Afhaling">
                    </form>
                </div>
                <div class="col-md-1">
                    <form action="cart.php?step=3" method="post">
                        <input type="submit" class="btn btn-default" value="Bevestiging" disabled="disabled">
                    </form>
                </div>
            </div>
            <div class="row">
                <form action="order.php" method="post" class="form-horizontal">
                    <div class="form-group">
                        <label for="totaal" class="col-sm-2 control-label">Totaalprijs</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" value="{{ totaal }} €" disabled="disabled">
                            <input type="text" name="totaal" id="totaal" value="{{ totaal }}" hidden="hidden">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="dagen" class="col-sm-2 control-label">Afhaal termijn</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" value="{{ dagen }} dag(en)" disabled="disabled">
                            <input type="number" name="dagen" id="dagen" value="{{ dagen }}" hidden="hidden">
                        </div>
                    </div>
                    {% if dagen != "" %}
                        <div class="form-group">
                            <div class="col-sm-2"></div>
                            <div class="col-sm-2">
                                <input type="submit" class="btn btn-success" value="Bevestig bestelling">
                            </div>
                        </div>
                    {% endif %}
                </form>
            </div>
        {% endif %}
    </div>
</section>
<!--einde inhoud-->