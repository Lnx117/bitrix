document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('myForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Отменяем стандартное действие формы (перезагрузку страницы)
        
        // Создаем объект FormData для сбора данных формы
        const formData = new FormData(this);

        // Преобразуем объект FormData в обычный объект JavaScript
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        formDataObject["customer_last_name"] = formData.get("customerLastName");
        formDataObject["customer_first_name"] = formData.get("customerFirstName");
        formDataObject["customer_patronymic"] = formData.get("customerPatronymic");
        formDataObject["customer_phone"] = formData.get("phone");
        formDataObject["app_city"] = formData.get("city");
        formDataObject["app_street"] = formData.get("street");
        formDataObject["app_house_number"] = formData.get("houseNumber");
        formDataObject["app_house_building"] = formData.get("houseBuilding");
        formDataObject["app_floor_num"] = formData.get("floorNum");
        formDataObject["app_flat_num"] = formData.get("flatNum");
        formDataObject["app_house_entrance"] = formData.get("houseEntrance");
        formDataObject["problem_text"] = formData.get("problemText");
        // Добавляем дополнительные поля к объекту данных
        formDataObject["bitrix_customer_id"] = "1221321";
        formDataObject["app_status"] = "Принято";
        console.log(JSON.stringify(formDataObject));
        // Отправляем данные на сервер методом POST
        fetch(this.action, {
            method: 'POST',
            body: JSON.stringify(formDataObject), // Отправляем данные в виде JSON
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json()) // Предполагая, что сервер возвращает JSON
        .then(data => {
            // Здесь вы можете обработать ответ от сервера (переменная "data")
            console.log(data);
        })
        .catch(error => {
            // Обработка ошибок, если запрос не выполнен
            console.error('Ошибка:', error);
        });
    });
});