<?php

namespace TitusPiJean\Flarum\Auth\LDAP\Extenders;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;

class AddForumAttributes
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(ForumSerializer $serializer)
    {
      $attributes['onlyUseLDAP'] = (bool) $this->settings->get('tituspijean-auth-ldap.onlyUse');
      $attributes['LDAP_method_name'] = (string) $this->settings->get('tituspijean-auth-ldap.method_name');

      return $attributes;
    }
}
