import { Component, Prop, h } from '@stencil/core';
import 'iconify-icon';

@Component({
    tag: 'biit-artist',
    styleUrl: 'biit-artist.scss',
})
export class BiitArtist {
    @Prop() artist: any;
    @Prop() events: [] = [];
    @Prop() backgroundColor: string;
    @Prop() textColor: string;
    @Prop() textHoverColor: string;
    @Prop() fontFamily: string;
    @Prop() buttonBgColor: string;
    @Prop() buttonTextColor: string;
    @Prop() buttonBgHoverColor: string;

    render() {
        return (
            <div class="biit-artist" style={{
                '--background-color': this.backgroundColor,
                '--text-color': this.textColor,
                '--text-hover-color': this.textHoverColor,
                '--button-bg-color': this.buttonBgColor,
                '--font-family': this.fontFamily,
            }}>
                <a class="biit-logo" href={this.artist?.url} target="_blank">
                    <svg id="Logos" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" fill="#00cec8">
                        <defs>
                            {/* <style>.cls-1{fill:#00cec8;}</style> */}
                        </defs>
                        <rect class="cls-1" x="173.91" y="152.17" width="65.22" height="86.96" />
                        <rect class="cls-1" x="260.87" y="152.17" width="65.22" height="86.96" />
                        <rect class="cls-1" x="347.83" y="86.96" width="65.22" height="152.17" />
                        <polygon class="cls-1"
                            points="173.91 260.87 173.91 326.09 347.83 326.09 347.83 347.83 152.17 347.83 152.17 86.96 86.96 86.96 86.96 413.04 413.04 413.04 413.04 260.87 173.91 260.87" />
                    </svg>
                </a>
                {/* Artist Header */}
                <div class="biit-artist__header">
                    <img class="biit-artist__image" src={this.artist?.image_url} alt={this.artist?.name} />
                    <div class="biit-artist__info">
                        <h2 class="biit-artist__name">{this.artist?.name}</h2>
                        <p class="biit-artist__tracker"><iconify-icon icon="ph:users-three-fill" width="16" height="16"></iconify-icon> {this.artist?.tracker_count.toLocaleString()} fans</p>
                        <div class="biit-artist__links">
                            {this.artist?.links.map((link: { type: string, url: string }) => (
                                <a class={`biit-artist__link biit-artist__link--${link.type}`} href={link.url} target="_blank">
                                    <iconify-icon icon={this.getSocialIcon(link.type)} width="24" height="24"></iconify-icon>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Event Section */}
                <div class="biit-artist__events">
                    <h3>Upcoming Events</h3>
                    {this.events?.length > 0 ? (
                        this.events.map(event => this.renderEvent(event))
                    ) : (
                        <p class="biit-artist__no-events">No upcoming events.</p>
                    )}
                </div>
            </div>
        );
    }

    renderEvent(event: { url: string, venue: { name: string, city: string, region: string }, datetime: string, lineup: string[], offers: { url: string }[] }) {
        return (
            <div class="biit-artist__event">
                <a class="biit-artist__event-info" href={event.url}>
                    <h4 class="biit-artist__event-name">{event.venue.name}</h4>
                    <p class="biit-artist__event-date">{new Date(event.datetime).toLocaleString()}</p>
                    <p class="biit-artist__event-location">{event.venue.city}, {event.venue.region}</p>
                    <p class="biit-artist__event-lineup">{event.lineup.join(', ')}</p>
                </a>
                {event.offers.length > 0 && (
                    <a class="biit-artist__event-tickets" href={event.offers[0].url} target="_blank">Get Tickets</a>
                )}
            </div>
        );
    }

    getSocialIcon(type: string) {
        const icons = {
            spotify: 'mdi:spotify',
            itunes: 'mdi:apple',
            facebook: 'mdi:facebook',
            instagram: 'mdi:instagram',
            website: 'mdi:web',
        };
        const icon = icons[type] || 'mdi:link';

        return icon;
    }
}
