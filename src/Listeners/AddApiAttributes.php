<?php

namespace TitusPiJean\Flarum\Auth\LDAP\Listeners;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\ForumSerializer;
use Illuminate\Contracts\Events\Dispatcher;

class AddApiAttributes
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen(Serializing::class, [$this, 'prepareApiAttributes']);
    }

    public function prepareApiAttributes(Serializing $event)
    {
      if ($event->isSerializer(ForumSerializer::class)) {
        $event->attributes['onlyUseLDAP'] = (bool) $this->settings->get('tituspijean-auth-ldap.onlyUse');
        $event->attributes['LDAP_method_name'] = (string) $this->settings->get('tituspijean-auth-ldap.method_name');
      }
    }
}
