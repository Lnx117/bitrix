<div>
    <form action="http://laraveltestserverapi.ru/api/createApplication" id="myForm" method="POST">
        <div class="custom_row row">
            <div class="col-md-4">
                <label for="customerLastName">Фамилия</label>
                <input name="customerLastName" class="form-control" id="customerLastName" placeholder="Фамилия" required>
            </div>

            <div class="col-md-4">
                <label for="customerFirstName">Имя</label>
                <input name="customerFirstName" class="form-control" id="customerFirstName" placeholder="Имя" required>
            </div>

            <div class="col-md-4">
                <label for="customerPatronymic">Отчество</label>
                <input name="customerPatronymic" class="form-control" id="customerPatronymic" placeholder="Отчество" required>
            </div>
        </div>
            
        <div class="custom_row row">
            <div class="col-md-6">
                <label for="phone">Телефон</label>
                <input name="phone" class="form-control" id="phone" placeholder="Телефон" required>
            </div>
        </div>

        <div class="custom_row row">
            <div class="col-md-4">
                <label for="city">Город</label>
                <input name="city" class="form-control" id="city" placeholder="Город" required>
            </div>
        </div>

        <div class="custom_row row">
            <div class="col-md-4">
                <label for="street">Улица</label>
                <input name="street" class="form-control" id="street" placeholder="Улица" required>
            </div>
        </div>
        
        <div class="custom_row row">
            <div class="col-md-4">
                <label for="houseNumber">Дом</label>
                <input name="houseNumber" class="form-control" id="houseNumber" placeholder="Дом" required>
            </div>

            <div class="col-md-4">
                <label for="houseBuilding">Строение</label>
                <input name="houseBuilding" class="form-control" id="houseBuilding" placeholder="Строение" required>
            </div>
        </div>

        <div class="custom_row row">
            <div class="col-md-4">
                <label for="houseEntrance">Подъезд</label>
                <input name="houseEntrance" class="form-control" id="houseEntrance" placeholder="Подъезд" required>
            </div>

            <div class="col-md-4">
                <label for="floorNum">Этаж</label>
                <input name="floorNum" class="form-control" id="floorNum" placeholder="Этаж" required>
            </div>

            <div class="col-md-4">
                <label for="flatNum">Квартира номер</label>
                <input name="flatNum" class="form-control" id="flatNum" placeholder="Квартира номер" required>
            </div>
        </div>

        <div style="margin:15px 0;">
            <label for="problemText">Описание проблемы</label>
            <textarea rows="5" name="problemText" class="form-control" id="problemText" placeholder="Описание проблемы"></textarea>
        </div>

        <button type="submit" id="submit">Создать заявку</button>
    </form>
</div>
