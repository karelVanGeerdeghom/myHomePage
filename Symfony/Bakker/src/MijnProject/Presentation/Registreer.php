<!--inhoud--> 
<section>
    <div class="container">
        <h1>Registreer u</h1>
        {% if error == 'emailexists' %}
            <div class="alert alert-danger">Email bestaat al!</div>
        {% endif %}
        {% if error == 'success' %}
            <div class="alert alert-success">U bent successvol geregistreerd!</div>
        {% endif %}
        <form action="subscribe.php?action=add" method="post" class="form-horizontal">
            <div class="form-group">
                <label for="email" class="col-sm-2 control-label">email</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" name="email" id="email" placeholder="email">
                </div>
            </div>
            <div class="form-group">
                <label for="naam" class="col-sm-2 control-label">naam</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" name="naam" id="naam" placeholder="naam">
                </div>
            </div>
            <div class="form-group">
                <label for="voornaam" class="col-sm-2 control-label">voornaam</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" name="voornaam" id="voornaam" placeholder="voornaam">
                </div>
            </div>
            <div class="form-group">
                <label for="adres" class="col-sm-2 control-label">straat + nr</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" name="adres" id="adres" placeholder="straat + nr">
                </div>
            </div>
            <div class="form-group">
                <label for="post" class="col-sm-2 control-label">gemeente</label>
                <div class="col-sm-6">
                    <select name="post" class="form-control">
                        {% for postcode in postcodelijst %}
                        <option value="{{ postcode.id }}">
                            {{ postcode.postcode }} - {{ postcode.gemeente }}
                        </option>
                        {% endfor %}
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="submit" class="col-sm-2 control-label"></label>
                <div class="col-sm-6">
                    <input type="submit" name="submit" class="btn btn-success" value="Registreer">
                </div>
            </div>
        </form>
    </div>
</section>
<!--einde inhoud-->