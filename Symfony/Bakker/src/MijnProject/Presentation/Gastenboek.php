<!--inhoud--> 
<section>
     <div class="container">
        <h1>Gastenboek</h1>
        {% if login == 'login' %}
        <div class="well">
            <h3>Vul ons gastenboek in!</h3>
            <form method="post" action="addmessage.php">
                <div class="form-group">
                    <textarea name="message" class="form-control" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <input type="submit" class="btn btn-default" value="Submit">
                </div>
            </form>
        </div>
        {% endif %}
    </div>
    <div class="container">
        <div class="row">
            {% for boodschap in boodschaplijst %}
            <article class="col-md-12 well">
                <h4>{{ boodschap.klantnr.voornaam }} {{ boodschap.klantnr.naam }} schreef op {{ boodschap.datum }}</h4>
                <p>{{ boodschap.boodschap }}</p>
            </article>
            {% endfor %}
        </div>
    </div>
</section>
<!--einde inhoud-->