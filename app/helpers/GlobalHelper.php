<?php

use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

if (!function_exists('formatDate')) {
    function formatDate($from, $to, $date, $indonesianMonth = false)
    {
        if (!empty($date)) {
            $formatted  = Carbon::createFromFormat($from, $date)->translatedFormat($to);

            if ($indonesianMonth) {
                $explode    = explode(" ", $formatted);
                $month      = indonesianMonthName($explode[1]);
                return $explode[0] . " " . $month . " " . $explode[2];
            }

            return $formatted;
        }
    }
}

if (!function_exists('whereFromRequest')) {
    function whereFromRequest($model, $request)
    {
        foreach ($request->all() as $field => $value) {
			if (Schema::hasColumn($model->getTable(), $field) && !empty($model->{$value})) {
				$model = $model->where($field, $value);
			}
		}
        return $model;
    }
}



if (!function_exists("rootFolder")) {

    function rootFolder(): String
    {
        return str_replace("/public", "", $_SERVER['DOCUMENT_ROOT']);
    }
}

if (!function_exists("jsonFileToCollection")) {

    function jsonFileToCollection(String $path): Collection
    {
        $json       = file_get_contents(rootFolder() . $path);

        return collect(json_decode($json, true));
    }
}

if (!function_exists("rangeDateToArray")) {

    function rangeDateToArray(String $startDate, String $endDate, String $format): array
    {
        $endDate    = Carbon::parse($endDate)->addDay()->format("Y-m-d");

        $period     = new DatePeriod(
            new DateTime($startDate),
            new DateInterval('P1D'),
            new DateTime($endDate)
        );

        $dates   = [];

        foreach ($period as $key => $value) {
            $dates[]    = $value->format($format);
        }

        return $dates;
    }
}

if (!function_exists('saveFile')) {

    function saveFile($file, $lokasi)
    {
        $file_name     = null;

        if (!empty($file)) {
            $file       = $file;

            if (!File::isDirectory(storage_path() . '/app/public/' . $lokasi)) {
                File::makeDirectory(storage_path() . '/app/public/' . $lokasi, 0777, true);
            }

            if (substr($file->getMimeType(), 0, 5) == 'image') {
                if (!empty($file)) {
                    $extension  = !empty($file->getClientOriginalExtension()) ? $file->getClientOriginalExtension() : $file->guessExtension();
                    // dd($extension);
                    $filename   = md5($file->getFilename()) . '.' . $extension;
                    $location   = storage_path() . '/app/public/' . $lokasi . '/' . $filename;
                    Image::make($file)->save($location);

                    $file_name = $filename;
                }
            } else {
                if (!empty($file)) {
                    $extension  = !empty($file->getClientOriginalExtension()) ? $file->getClientOriginalExtension() : $file->guessExtension();
                    $filename   = md5($file->getFilename()) . '.' . $extension;

                    $file->storeAs('public/' . $lokasi, $filename);

                    $file_name = $filename;
                }
            }
        }

        return $file_name;
    }
}

if (!function_exists("saveBase64ToImage")) {

    function saveBase64ToImage($base64_string, $dynamic_folder, $nip = "")
    {
        $format            = "data:image/png;base64,";
        $string_format     = $format . $base64_string;
        $storage_path     = storage_path() . '/app/public/' . $dynamic_folder . '/';

        if (!File::isDirectory($storage_path)) {
            File::makeDirectory($storage_path, 0777, true);
        }
        $ext             = explode('/', mime_content_type($string_format))[1];
        $filename         = time() . "" . md5(rand(1, 100)) . "" . $nip . "." . $ext;
        $location       = $storage_path . $filename;
        Image::make(file_get_contents($string_format))->save($location);

        return $filename;
    }
}

if (!function_exists("saveBase64ToFile")) {

    function saveBase64ToFile($base64_string, $dynamic_folder,  $acceptedMimeType = [], $nip = "")
    {
        $storage_path     = storage_path() . '/app/public/' . $dynamic_folder . '/';

        if (!File::isDirectory($storage_path)) {
            File::makeDirectory($storage_path, 0777, true);
        }

        $decode     = base64_decode($base64_string);
        $mimeType   = getMimeTypeBase64($decode);
        $fileName   = md5(uniqid(rand(), true)) . "." . $mimeType;

        if (!in_array($mimeType, $acceptedMimeType)) {
            $implode    = implode(",", $acceptedMimeType);
            throw new \Exception("File yang diperboleh kan hanya : " . $implode, 422);
        }

        Storage::disk('public')->put($dynamic_folder . "/" . $fileName, $decode);

        return $fileName;
    }
}

if (!function_exists("getMimeTypeBase64")) {

    function getMimeTypeBase64($decode)
    {
        $f          = finfo_open();
        $mime_type  = finfo_buffer($f, $decode, FILEINFO_MIME_TYPE);

        return str_replace("application/", "", $mime_type);
    }
}

if (!function_exists('deleteFile')) {

    function deleteFile($filename, $lokasi)
    {
        $path = storage_path() . '/app/public/' . $lokasi . '/';
        return File::delete($path . $filename);
    }
}

if (!function_exists('indonesianDayName')) {

    function indonesianDayName($name)
    {
        $indonesia_name     = '';
        switch ($name) {
            case 'Sunday':
                $indonesia_name     = 'Minggu';
                break;
            case 'Monday':
                $indonesia_name     = 'Senin';
                break;
            case 'Tuesday':
                $indonesia_name     = 'Selasa';
                break;
            case 'Wednesday':
                $indonesia_name     = 'Rabu';
                break;
            case 'Thursday':
                $indonesia_name     = 'Kamis';
                break;
            case 'Friday':
                $indonesia_name     = 'Jumat';
                break;
            case 'Saturday':
                $indonesia_name     = 'Sabtu';
                break;
        }

        return $indonesia_name;
    }
}

if (!function_exists("getTimeWord")) {
    function getTimeWord(): String
    {
        $now             = Carbon::now()->format('H:i');
        $status         = '';
        if (strtotime($now) >= strtotime('00:01') && strtotime($now) <= strtotime('11:00')) {
            $status     = 'Pagi';
        } else if (strtotime($now) >= strtotime('11:01') && strtotime($now) <= strtotime('14:59')) {
            $status     = 'Siang';
        } else if (strtotime($now) >= strtotime('15:00') && strtotime($now) <= strtotime('18:59')) {
            $status     = 'Sore';
        } else if (strtotime($now) >= strtotime('19:00') && strtotime($now) <= strtotime('23:59')) {
            $status     = 'Malam';
        }

        return $status;
    }
}

if (!function_exists("diffBetweenHour")) {

    function diffBetweenHour($firstDate, $secondDate)
    {
        if (empty($firstDate) || empty($secondDate)) {
            return null;
        }

        $start  = Carbon::parse($firstDate);
        $end    = Carbon::parse($secondDate);

        return $start->diff($end)->format("%H Jam %i Menit");
    }
}

if (!function_exists("diffBetweenHour")) {

    function diffBetweenHour($firstDate, $secondDate)
    {
        if (empty($firstDate) || empty($secondDate)) {
            return null;
        }

        $start  = Carbon::parse($firstDate);
        $end    = Carbon::parse($secondDate);

        return $start->diff($end)->format("%H Jam %i Menit");
    }
}


if (!function_exists('set_date')) {
    function set_date($timestamp = '', $date_format = 'l, j F Y')
    {
        if (trim($timestamp) == '') {
            $timestamp = time();
        } elseif (!ctype_digit($timestamp)) {
            $timestamp = strtotime($timestamp);
        }
        # remove S (st,nd,rd,th) there are no such things in indonesia :p
        $date_format = preg_replace("/S/", "", $date_format);
        $pattern = array(
            '/Mon[^day]/', '/Tue[^sday]/', '/Wed[^nesday]/', '/Thu[^rsday]/',
            '/Fri[^day]/', '/Sat[^urday]/', '/Sun[^day]/', '/Monday/', '/Tuesday/',
            '/Wednesday/', '/Thursday/', '/Friday/', '/Saturday/', '/Sunday/',
            '/Jan[^uary]/', '/Feb[^ruary]/', '/Mar[^ch]/', '/Apr[^il]/', '/May/',
            '/Jun[^e]/', '/Jul[^y]/', '/Aug[^ust]/', '/Sep[^tember]/', '/Oct[^ober]/',
            '/Nov[^ember]/', '/Dec[^ember]/', '/January/', '/February/', '/March/',
            '/April/', '/June/', '/July/', '/August/', '/September/', '/October/',
            '/November/', '/December/',
        );
        $replace = array(
            'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min',
            'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu',
            'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des',
            'Januari', 'Februari', 'Maret', 'April', 'Juni', 'Juli', 'Agustus', 'September',
            'Oktober', 'November', 'Desember',
        );
        $date = date($date_format, $timestamp);
        $date = preg_replace($pattern, $replace, $date);
        $date = "{$date}";
        return $date;
    }
}

if (!function_exists("generateRandomString")) {
    function generateRandomString($length = 10)
    {
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        $randomString = '';

        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, strlen($characters) - 1)];
        }

        return $randomString;
    }
}

if (!function_exists("maskPhoneNumber")) {

    function maskPhoneNumber($number)
    {
        if (str_starts_with($number, "0")) {
            return ltrim($number, "0");
        }

        return $number;
    }
}

if (!function_exists("formatRp")) {
    function formatRp($value)
    {
        return number_format($value, 0, '.', ',');
    }
}

if (!function_exists("indonesianMonthName")) {
    function indonesianMonthName($monthNameEng)
    {
        $monthNameInd         = '';
        switch ($monthNameEng) {
            case 'January':
                $monthNameInd     = 'Januari';
                break;
            case 'February':
                $monthNameInd     = 'Februari';
                break;
            case 'March':
                $monthNameInd     = 'Maret';
                break;
            case 'April':
                $monthNameInd     = 'April';
                break;
            case 'May':
                $monthNameInd     = 'Mei';
                break;
            case 'June':
                $monthNameInd     = 'Juni';
                break;
            case 'July':
                $monthNameInd     = 'Juli';
                break;
            case 'August':
                $monthNameInd     = 'Agustus';
                break;
            case 'September':
                $monthNameInd     = 'September';
                break;
            case 'October':
                $monthNameInd     = 'Oktober';
                break;
            case 'November':
                $monthNameInd     = 'November';
                break;
            case 'December':
                $monthNameInd     = 'Desember';
                break;
        }

        return $monthNameInd;
    }
}

if (!function_exists("monthRomawi")) {
    function monthRomawi($month)
    {
        $arr = [
            "01"             => "I",
            "02"             => "II",
            "03"             => "IV",
            "04"             => "V",
            "05"             => "V",
            "06"             => "VI",
            "07"             => "VII",
            "08"             => "VIII",
            "09"             => "IX",
            "10"             => "X",
            "11"             => "XI",
            "12"             => "XII",
        ];

        return $arr[$month];
    }
}

if (!function_exists("terbilang")) {
    function terbilang($x)
    {

        if (substr($x, 0, 1) === '0') {
            $x = substr($x, 1);
        }

        $angka = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];

        if ($x < 12)
            return " " . $angka[$x];
        elseif ($x < 20)
            return terbilang($x - 10) . " Belas";
        elseif ($x < 100)
            return terbilang($x / 10) . " Puluh" . terbilang($x % 10);
        elseif ($x < 200)
            return "Seratus" . terbilang($x - 100);
        elseif ($x < 1000)
            return terbilang($x / 100) . " Ratus" . terbilang($x % 100);
        elseif ($x < 2000)
            return "Seribu" . terbilang($x - 1000);
        elseif ($x < 1000000)
            return terbilang($x / 1000) . " Ribu" . terbilang($x % 1000);
        elseif ($x < 1000000000)
            return terbilang($x / 1000000) . " Juta" . terbilang($x % 1000000);
    }
}

if (!function_exists("cekRelasiBeforeDelete")) {
    function cekRelasiBeforeDelete($model, $modelAttribute = null, $relations = [])
    {
        foreach ($relations as $relation) {
            $count = $model->{$relation}()->count();
            if ($count > 0) {
                $text = $modelAttribute ? $model->{$modelAttribute} : 'data';
                $strRelasi = str_replace('-', ' ', Str::kebab($relation));
                $message = "$text masih berelasi dengan $count data $strRelasi";
                session()->put('cekRelasiBeforeDelete', ['ids' => $model->{$relation}()->pluck('id'), 'table' => $relation, 'message' => $message]);
                throw ValidationException::withMessages(["Gagal! $message"]);
            }
        }
        return $model;
    }
}

if (!function_exists("pembulatanKelipatanPuluhan")) {
    function pembulatanKelipatanPuluhan($value, $maxRemainder = 1)
    {
        $remainder = $value % 10;
        if ($remainder >= $maxRemainder) {
            return ceil($value / 10) * 10;
        } else {
            return floor($value / 10) * 10;
        }
    }
}

function tambahHuruf($string, $n)
{
    // Ubah string ke dalam array karakter
    $chars = str_split($string);

    // Lakukan iterasi ke belakang pada array karakter untuk menangani pembawa
    for ($i = count($chars) - 1; $i >= 0; $i--) {
        // Konversi karakter ke kode ASCII dan tambahkan $n
        $ascii = ord($chars[$i]) + $n;

        // Jika lebih besar dari "Z" (kode ASCII 90 untuk huruf besar), kita harus menangani carry
        if ($ascii > ord('Z')) {
            // Menghitung carry
            $carry = floor($ascii / (ord('Z') + 1));
            // Hapus carry dari kode ASCII
            $ascii -= $carry * (ord('Z') + 1);

            // Jika setelah menghapus carry, karakter berada di luar "Z", tambahkan carry ke karakter sebelumnya
            if ($ascii < ord('A')) {
                $carry--;
                $ascii += ord('Z') + 1;
            }

            // Konversi kembali ke karakter dan simpan perubahan
            $chars[$i] = chr($ascii);
        } else {
            // Jika tidak ada carry, cukup tambahkan $n ke karakter dan selesai
            $chars[$i] = chr($ascii);
            break;
        }
    }

    // Jika masih ada carry yang tersisa, tambahkan karakter baru di depan
    while (@$carry > 0) {
        // Jika carry terakhir mencapai indeks 0, kita harus menambahkan karakter baru di depan
        if ($i == 0) {
            array_unshift($chars, 'A');
            break;
        }
        // Kurangi $i dan tambahkan carry ke karakter sebelumnya
        $i--;
        $chars[$i] = chr(ord($chars[$i]) + $carry);

        // Hitung kembali carry
        $carry = floor(ord($chars[$i]) / (ord('Z') + 1));
        // Hapus carry dari kode ASCII
        $chars[$i] = chr(ord($chars[$i]) % (ord('Z') + 1));
    }

    // Gabungkan kembali array karakter menjadi string
    return implode('', $chars);
}
