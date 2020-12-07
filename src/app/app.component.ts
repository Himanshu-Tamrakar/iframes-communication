import { AfterContentInit, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentInit {

  ngAfterContentInit(): void {
    const results: HTMLElement = document.getElementById('results');

    // Event listener to message event. whenever send message method call via iframm this method will execute
    this.bindEvent(window, 'message', (e) => {
      results.innerHTML = e.data ? e.data : '';
    });
  }


  // Dynamically add iframe to body tab: with mentioned id and src
  public launchIfram(iframeSource: string): void {
    const elem = document.getElementById('the_iframe');
    if (elem) { elem.remove(); }

    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', iframeSource);
    iframe.setAttribute('id', 'the_iframe');
    iframe.style.width = 450 + 'px';
    iframe.style.height = 300 + 'px';
    document.body.appendChild(iframe);
  }

  // Dynamic method to bind an event like click, on, etc..
  bindEvent(element, eventName, eventHandler): void {
    if (element.addEventListener) {
      element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + eventName, eventHandler);
    }
  }

  // Send a message to iframe vai taking window object through iframe.contentWindow.
  sendMessage(msg: string, host: string): void {
    msg = Math.random() + '';
    const iframeEl: any = document.getElementById('the_iframe');
    // Make sure you are sending a string, and to stringify JSON
    iframeEl.contentWindow.postMessage(msg, host);
  }
}
