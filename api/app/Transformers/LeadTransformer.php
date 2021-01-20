<?php
namespace App\Transformers;

use League\Fractal\TransformerAbstract;

/**
 * Transformer category data suitable for public viewing
 */
class LeadTransformer extends TransformerAbstract
{

    /**
     * @var bool
     */
    private $obfuscate = true;

    public function __construct($obfuscate = true) {
        $this->obfuscate = $obfuscate;
    }

    /**
     * Transform a lead with a transformer.
     *
     * @param mixed $lead
     *
     * @return array
     */
    public function transform($lead)
    {
        $lead->name = $this->obfuscateName($lead->name);
        if ($this->obfuscate) {
            $lead->email = $this->obfuscateEmail($lead->email);
            $lead->phone = $this->obfuscateTelephone($lead->phone);
        }

        return $lead->toArray();
    }

    private function obfuscateName($name) {
        return $name;
        try {
            return explode(' ', $name)[0];
        } catch (\Exception $e) {
            return $name;
        }
    }

    private function obfuscateTelephone($number) {
        return strrev(preg_replace('/[0-9]/', '*', strrev($number), 5));
    }

    private function obfuscateEmail($email) {
        $mailParts = explode("@", $email);
        if (count($mailParts) != 2) {
            return '';
        }

        $replace = str_repeat("*", 5);

        return $mailParts[0][0] . $replace . "@" . substr_replace($mailParts[1], "**", 0, 2);
    }

}
