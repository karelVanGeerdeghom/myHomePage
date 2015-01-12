<script>
    function Calculate(dit) {
        var prijs = dit.form.prijs.value;
        var aantal = dit.form.aantal.value;
        dit.form.kost.value = (Math.round(100 * prijs * aantal) / 100) + ' €';
    }    
</script>
<!--inhoud--> 
<section>
    <div class="container">
        <h1>Aanbod</h1>
        {% if bestel == 'ja' %}
            <div class="alert alert-success">Dank u voor uw bestelling!</div>
        {% endif %}
        {% for type in typelijst %}
            {% if type.actief == 1 %}
                <a name="{{ type.id }}"></a><h2>{{ type.omschrijving }}</h2>
                {% if (action == 'add') and (typeid == type.id) %}
                    <div class="alert alert-success">{{ productnaam }} toegevoegd aan mandje!</div>
                {% endif %}
                <div class="row"> 
                {% for product in productlijst %}
                    {% if product.typeid.id == type.id and product.actief == 1 %}
                        <article class="col-md-2 well">                
                            <h4>{{ product.omschrijving }}</h4>
                            <img src="img/{{ product.omschrijving }}.jpg" class="img-rounded" title="{{ product.omschrijving }} - {{ product.prijs }} €">
                            {% if login == 'login' %}
                                <form method="post" action="cartaddto.php" class="form-inline">
                                    <div class="form-group">
                                        <input type="text" name="kost" value="{{ product.prijs }} €" class="form-control prijs" disabled="disabled">
                                        <input type="text" name="prijs" value="{{ product.prijs }}" hidden="hidden">
                                    </div>
                                    <div class="form-group">
                                        <label for="aantal" class="sr-only">aantal</label>
                                        <select name="aantal" class="form-control" id="aantal" onchange="Calculate(this)">
                                            {% for i in 1..20 %}
                                                <option value="{{ i }}">{{ i }}</option>
                                            {% endfor %}
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <input type="submit" class="btn btn-default" value="Bestel">
                                        <input type="text" name="prodid" value="{{ product.id }}" hidden="hidden">
                                        <input type="text" name="goto" value="{{ type.id }}" hidden="hidden">
                                    </div>
                                </form>
                            {% endif %}
                        </article>
                    {% endif %}
                {% endfor %}
                </div>
            {% endif %}
        {% endfor %}
    </div>
</section>
<!--einde inhoud-->