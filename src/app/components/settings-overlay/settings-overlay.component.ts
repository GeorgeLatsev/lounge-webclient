import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/services/users/models/user.model';
import { UserService } from 'src/app/core/services/users/user.service';


@Component({
  selector: 'app-settings-overlay',
  templateUrl: './settings-overlay.component.html',
})
export class SettingsOverlayComponent implements OnInit {

  @Output() closeEvent = new EventEmitter()

  nameForm: FormGroup;

  user$: Observable<User>;

  tab: Tab = Tab.Profile;
  Tab = Tab;

  topOptions = ['longHair', 'shortHair', 'eyepatch', 'hat', 'hijab', 'turban'];
  top: string = this.topOptions[0];

  hatColorOptions = ['black', 'blue', 'gray', 'heather', 'pastel', 'pink', 'red', 'white'];
  hatColor: string = this.hatColorOptions[0];

  hairColorOptions = ['brown', 'auburn', 'black', 'blonde', 'pastel', 'platinum', 'red', 'gray'];
  hairColor: string = this.hairColorOptions[0];

  accessoriesOptions = ['none', 'kurt', 'prescription01', 'prescription02', 'round', 'sunglasses', 'wayfarers'];
  accessories: string = this.accessoriesOptions[0];

  accessoriesColorOptions = ['black', 'blue', 'gray', 'heather', 'pastel', 'pink', 'red', 'white'];
  accessoriesColor: string = this.accessoriesColorOptions[0];

  facialHairOptions = ['none', 'medium', 'light', 'majestic', 'fancy', 'magnum'];
  facialHair: string = this.facialHairOptions[0];

  facialHairColorOptions = ['auburn', 'black', 'blonde', 'brown', 'pastel', 'platinum', 'red', 'gray']; // fade or hide color options if none
  facialHairColor: string = this.facialHairColorOptions[0];

  clothesOptions = ['blazer', 'sweater', 'shirt', 'hoodie', 'overall'];
  clothes: string = this.clothesOptions[0];

  clothesColorOptions = ['black', 'blue', 'gray', 'heather', 'pastel', 'pink', 'red', 'white'];
  clothesColor: string = this.clothesColorOptions[0];

  eyesOptions = ['close', 'cry', 'default', 'dizzy', 'roll', 'happy', 'hearts', 'side', 'squint', 'surprised', 'wink', 'winkWacky'];
  eyes: string = this.eyesOptions[0];

  eyebrowOptions = ['default', 'angry', 'flat', 'raised', 'sad', 'unibrow', 'up', 'frown'];
  eyebrow: string = this.eyebrowOptions[0];

  mouthOptions = ['default', 'concerned', 'disbelief', 'eating', 'grimace', 'sad', 'scream', 'serious', 'smile', 'tongue', 'twinkle'];
  mouth: string = this.mouthOptions[0];

  skinOptions = ['light', 'tanned', 'yellow', 'pale', 'brown', 'darkBrown', 'black'];
  skin: string = this.skinOptions[0];

  avatarIsBeingEdited: boolean = false;

  nameIsBeingEdited: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    public snackBar: MatSnackBar
  ) {
    this.user$ = userService.getUser();

    this.nameForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(24), Validators.pattern('^[A-Za-z0-9-_]*$')])
    })
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }

  toggleAvatarEdit(): void {
    this.nameIsBeingEdited = false;
    this.avatarIsBeingEdited = !this.avatarIsBeingEdited;
  }

  toggleNameEdit(): void {
    this.avatarIsBeingEdited = false;
    this.nameIsBeingEdited = !this.nameIsBeingEdited;
  }

  randomizeAvatar(): void {
    this.top = this.topOptions[Math.floor(Math.random() * this.topOptions.length)];
    this.hatColor = this.hatColorOptions[Math.floor(Math.random() * this.hatColorOptions.length)];
    this.hairColor = this.hairColorOptions[Math.floor(Math.random() * this.hairColorOptions.length)];
    this.accessories = this.accessoriesOptions[Math.floor(Math.random() * this.accessoriesOptions.length)];
    this.accessoriesColor = this.accessoriesColorOptions[Math.floor(Math.random() * this.accessoriesColorOptions.length)];
    this.facialHair = this.facialHairOptions[Math.floor(Math.random() * this.facialHairOptions.length)];
    this.facialHairColor = this.facialHairColorOptions[Math.floor(Math.random() * this.facialHairColorOptions.length)];
    this.clothes = this.clothesOptions[Math.floor(Math.random() * this.clothesOptions.length)];
    this.clothesColor = this.clothesColorOptions[Math.floor(Math.random() * this.clothesColorOptions.length)];
    this.eyes = this.eyesOptions[Math.floor(Math.random() * this.eyesOptions.length)];
    this.eyebrow = this.eyebrowOptions[Math.floor(Math.random() * this.eyebrowOptions.length)];
    this.mouth = this.mouthOptions[Math.floor(Math.random() * this.mouthOptions.length)];
    this.skin = this.skinOptions[Math.floor(Math.random() * this.skinOptions.length)];
  }

  onNameSubmit(data: any): void {
    this.userService.changeUser({ name: data.name }).subscribe();
  }

  save() {
    this.userService.changeUser({ avatarUrl: `https://avatars.dicebear.com/4.5/api/avataaars/d.svg?top[]=${this.top}&hatColor[]=${this.hatColor}&hairColor[]=${this.hairColor}&accessoriesChance=${this.accessories === 'none' ? 0 : 100}&accessories[]=${this.accessories === 'none' ? this.accessoriesOptions[1] : this.accessories}&accessoriesColor[]=${this.accessoriesColor}&facialHairChance=${this.facialHair === 'none' ? 0 : 100}&facialHair[]=${this.facialHair === 'none' ? this.facialHairOptions[1] : this.facialHair}&facialHairColor[]=${this.facialHairColor}&clothes[]=${this.clothes}&clothesColor[]=${this.clothesColor}&eyes[]=${this.eyes}&eyebrow[]=${this.eyebrow}&mouth[]=${this.mouth}&skin[]=${this.skin}` }).subscribe();
    this.toggleAvatarEdit();
  }

}

enum Tab {
  Profile,
  Appearance
}