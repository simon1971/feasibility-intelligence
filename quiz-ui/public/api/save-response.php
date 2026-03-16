<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
    exit;
}

$storageDir = dirname(__DIR__) . '/data';
if (!is_dir($storageDir)) {
    mkdir($storageDir, 0775, true);
}

$entry = [
    'savedAt' => gmdate('c'),
    'ipHash' => hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown'),
    'payload' => $data,
];

$file = $storageDir . '/responses.jsonl';
$line = json_encode($entry, JSON_UNESCAPED_SLASHES) . PHP_EOL;
if (file_put_contents($file, $line, FILE_APPEND | LOCK_EX) === false) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Failed to save response']);
    exit;
}

http_response_code(200);
echo json_encode(['ok' => true]);
