// const fs = require("fs");
const path = require("path");
const fs = require('fs');
const { paths } = require("./settings");

function generateTelegram(done) {
  const phpContent = `<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $service = isset($_POST['service']) ? $_POST['service'] : '';
    
    $token = "";
    $chat_id = "";
    
    $arr = array(
        'Ім\`я: ' => $name,
        'Телефон: ' => $phone,
        'Послуга: ' => $service,
    );

    $txt = "";
    foreach ($arr as $key => $value) {
        $txt .= "<b>".$key."</b> ".$value."%0A";
    }

    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");

    $response = array();
    
    if ($sendToTelegram) {
        $response['status'] = 'success';
        $response['message'] = 'Ваше повідомлення успішно надіслано. Будь ласка, зачекайте, поки ми зв\\'яжемося з вами.';
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Під час надсилання повідомлення сталася помилка.';
    }

    header('Content-Type: application/json');
    echo json_encode($response);

} else {
    header('Content-Type: application/json');
    echo json_encode(array('status' => 'error', 'message' => 'No data received'));
}
?>`;

  const outputPath = path.join(paths.build.main, "telegram.php");
  fs.mkdirSync(paths.build.main, { recursive: true });
  fs.writeFileSync(outputPath, phpContent, "utf8");

  done();
}

module.exports = {
  generateTelegram
};